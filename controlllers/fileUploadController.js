const File = require("../models/file");
const fs = require("fs");

// local file uppload
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
