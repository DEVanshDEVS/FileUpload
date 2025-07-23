const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    },
});


//post middleware
fileSchema.post("save", async function (doc) {
    try{
        console.log("Doc: ", doc);
        //transporter
        //since this is a config, it should have been in the config folder under a new file
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //sending mail
        let info = await transporter.sendMail({
            from:`Devansh (Backend Testing)`,
            to:doc.email,
            subject:"New File Uploaded on CLOUDINARY",
            html:`<h1>Hello Beta,</h1> File Uploaded. View Here: <a href="${doc.imageUrl}">${doc.imageUrl}></p>`,
        })
        console.log("INFO:", info);
    } catch(error){
        console.error(error);
    }    
});

const File = mongoose.model("File", fileSchema);
module.exports = File;