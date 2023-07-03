const cloudinary = require("cloudinary").v2;

const UploadToCloudinary = async (file, folder, quality) => {
    try {
        const options = {folder}
        if(quality){
            options.quality = quality
        }
        options.resource_type = "auto"
        return await cloudinary.uploader.upload(file.tempFilePath, options)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = UploadToCloudinary;