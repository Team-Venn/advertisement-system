import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const profileImageUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "vennace./profile-images"
    },
  }),
  });

  export const advertImageUpload = multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "vennace./advert-images"
      },
    }),
  });