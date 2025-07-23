const File = require("../models/file");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

//local file uppload
exports.localFileUpload = async (req, res) => {
  try {
    // fetch file
    const file = req.files.file;
    console.log("Here is the file->", file);

    // __dirname = current directory
    // path to store the file (inside /controllers/files/)
    const folderPath = __dirname + "/files";

    // create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // build the full file path with extension
    let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
    console.log("PATH-> ", path);

    // move function to define where the file should go
    file.mv(path, (error) => {
      console.log(error);
      if (error) {
        return res.status(500).json({
          success: false,
          message: "File move failed",
        });
      }

      // sending status response
      res.status(200).json({
        success: true,
        message: "Local file uploaded Successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//function to check if the uploaded file type is supported or not
function isFileTypeSupported(type, supportedTypes){
  return supportedTypes.includes(type);
}

//Function to upload to cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
  const options = {folder};
  console.log("temp file path: ", file.tempFilePath);
  
  //for reduce image size function
  if (quality){
    options.transformation = [{ quality }];
  }

  options.resource_type = "auto";//detect file type automatically
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler
exports.imageUpload = async (req, res)=>{
  try{
    //data fetch
    const {name, tags, email} = req.body
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpeg", "jpg", "png"]; 
    const fileType = file.name.split('.')[1].toLowerCase();
    if(!isFileTypeSupported(fileType, supportedTypes)){
      return res.status(400).json({
        success:false,
        message:'File format not supported',
      });
    }

    //file format supported, upload to CLOUDINARY
    const response = await uploadFileToCloudinary(file, "Folder1");
    console.log(response);
    //db entry
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url,
    });

    res.json({
      success:true,
      imageUrl:response.secure_url,
      message:'Image Successfully Uploaded',
    });
      
  } catch(error){
    console.error(error);
    res.status(400).json({
      success:false,
      message:'Something went wrong',
    });
  }
};



//video upload handler(Almost same)
exports.videoUpload = async (req,res) =>{
  try{
    //data fetch
    const {name, tags, email} = req.body;
    console.log(name, tags, email);
    const videoFile = req.files.videoFile;

    //validation
    const supportedTypes = ["mp4", "mov"]; 
    const fileType = videoFile.name.split('.')[1].toLowerCase();
    if(!isFileTypeSupported(fileType, supportedTypes)){
      return res.status(400).json({
        success:false,
        message:'File format not supported',
      });
    }

    //TODO: add an upper limit of 5MB
    const maxSize = 5 * 1024 * 1024;
    if (videoFile.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB limit",
      });
    }
    //file format supported, upload to CLOUDINARY
    const response = await uploadFileToCloudinary(videoFile, "Folder1");
    console.log(response);

    //db entry
    const fileData = await File.create({
      name,
      tags,
      email,
      videoUrl:response.secure_url,
    });

    //send response
    res.json({
      success:true,
      videoUrl:response.secure_url,
      message:'Video Successfully Uploaded',
    });

  } catch(error){
    console.error(error);
    res.status(400).json({
      success:false,
      message:'Something went wrong',
    });
  }
};


//image size reducer function
exports.imageSizeReducer = async (req,res) => {
  try{
    //data fetch
    const {name, tags, email} = req.body
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpeg", "jpg", "png"]; 
    const fileType = file.name.split('.')[1].toLowerCase();
    if(!isFileTypeSupported(fileType, supportedTypes)){
      return res.status(400).json({
        success:false,
        message:'File format not supported',
      });
    }
    //TODO: add an upper limit of 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB limit",
      });
    }

    //file format supported, upload to CLOUDINARY
    const response = await uploadFileToCloudinary(file, "Folder1", 30);
    console.log(response);

    //db entry
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url,
    });

    res.json({
      success:true,
      imageUrl:response.secure_url,
      message:'Image Successfully Uploaded',
    });
  } catch(error){
    console.error(error);
    res.status(400).json({
      success:false,
      message:'Something went wrong',
    });
  }
};