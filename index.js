const express = require("express");
const { connect } = require("mongoose");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database");
connect();

require("./routes/fileUpload");

app.listen(PORT, ()=>{
    console.log(`The App is live on PORT NO. ${PORT}`);
});

app.get("/", (req,res)=>{
    res.send("This is HOMEPAGE");
});