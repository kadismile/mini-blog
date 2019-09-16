const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloudinaryCLOUD_NAME,
  api_key: process.env.cloudinaryAPI_KEY,
  api_secret: process.env.cloudinaryAPI_SECRET
});
module.exports = cloudinary;