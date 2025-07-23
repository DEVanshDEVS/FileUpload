# 🗂️ File Upload Backend (Cloudinary + Local)

A simple **Node.js** and **Express** backend project to upload **images**, **videos**, or **files** either to **local storage** or **Cloudinary**. After every upload, the user receives an **email notification** confirming the successful upload.

---

## 📦 Features

- ✅ Upload files to **Cloudinary**
- ✅ Upload files to **local server storage**
- ✅ Support for **images**, **videos**, and **documents**
- ✅ **Email notification** sent after each upload
- ✅ Organized **folder structure** (MVC-based)

---

## 🚀 Tech Stack

- Node.js  
- Express.js  
- Cloudinary SDK  
- Nodemailer  
- Express-fileupload  
- MongoDB + Mongoose (for file metadata)

---

## 📁 Project Structure

📦 FileUploadBackend
├── controllers/
│ └── fileController.js
├── models/
│ └── file.js
├── routes/
│ └── fileRoutes.js
├── config/
│ ├── cloudinary.js
│ └── nodemailer.js
├── files/ # Local uploads
├── .env
└── server.js

---

## ⚙️ Environment Variables (`.env`)

PORT=3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAIL_HOST=smtp.gmail.com
MAIL_USER=youremail@gmail.com
MAIL_PASS=your_app_password


---

## 📮 API Endpoints

| Method | Route           | Description                  |
|--------|------------------|------------------------------|
| POST   | `/upload/local`  | Uploads file to local server |
| POST   | `/upload/cloud`  | Uploads file to Cloudinary   |

---

## ✉️ Email Notification

Each time a file is successfully uploaded to **Cloudinary**, an **email is automatically sent** to the email provided in the request, confirming the upload.

---

## 📸 Sample Cloudinary Upload Response

{
  "name": "Test",
  "imageUrl": "IMAGE_URL",
  "tags": "nature",
  "email": "user@example.com"
}