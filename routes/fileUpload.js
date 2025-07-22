const express = require("express");
const router = express.Router();

const {localFileUpload} = require("../controlllers/fileUploadController");

router.post("/localFileUpload", localFileUpload);

module.exports = router;