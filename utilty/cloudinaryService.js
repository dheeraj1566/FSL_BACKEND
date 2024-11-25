import cloudinary from 'cloudinary';
import dotenv from "dotenv";
import tinify from 'tinify'; 
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const MAX_FILE_SIZE = 1 * 1024 * 1024; 
tinify.key = process.env.KEY;

export async function uploadImages(files) {
    if (typeof files !== 'object' || files === null) {
      throw new TypeError('Expected files to be an object');
    }
  
    const fileArray = Object.values(files);
    const results = [];
  
    // Ensure that each file upload is awaited
    for (const file of fileArray) {
      const result = await upload(file);
      results.push(result);
    }
  
    return results;  
}
  
  export async function upload(file) {  
      
    const { data, mimetype, name } = file;

    if(data.length>MAX_FILE_SIZE){
      console.log("file size is large")
      // Compress the image using Tinify API
      try {
        const compressedData = await compressImage(data);
        // Update file data with the compressed data
        file.data = compressedData;
      } catch (error) {
        console.error("Error compressing image:", error);
        throw new Error('Failed to compress the image');
      }
    }
  
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream( //function of cloudinery
        { resource_type: 'auto', public_id: name, mime_type: mimetype },
        (error, result) => {
          if (error) {
            reject('Error uploading image:', error);
          } else {
            console.log('Image uploaded successfully', result);
            resolve(result);  // Resolve with the result of the upload
          }
        }
      ).end(file.data);  // Upload the file
    });
}  

async function compressImage(imageData) {
  return new Promise((resolve, reject) => {
    tinify.fromBuffer(imageData).toBuffer((error, compressedData) => {
      if (error) {
        reject('Error compressing image with Tinify: ' + error.message);
      } else {
        resolve(compressedData);
      }
    });
  });
}