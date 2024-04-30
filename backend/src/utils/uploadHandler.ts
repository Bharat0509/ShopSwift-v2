import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";

interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
} as CloudinaryConfig);

const uploadOnCloudinary = async (
    localFilePath: string
): Promise<UploadApiResponse | null> => {
    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // Delete the locally saved temporary file
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // Handle error
        console.error("Error uploading file to Cloudinary:", error);
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation failed
        return null;
    }
};

export { uploadOnCloudinary };
