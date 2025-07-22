const express = require("express");
const connect = require("mongoose");
const app = express();
const fileUpload = require("express-fileupload");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
//middleware to interact with files like images and videos(npm i express-fileupload)
//we have other middleware like multer as well
app.use(fileUpload());

//connect with DB 
const db = require("./config/database");
db.connect();

//connect with cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//mount routes
const Upload = require("./routes/fileUpload");
app.use("/api/v1/upload", Upload);

//start server
app.listen(PORT, ()=>{
    console.log(`The App is live on PORT NO. ${PORT}`);
});

//default route
app.get("/", (req,res)=>{
    res.send("This is HOMEPAGE");
});