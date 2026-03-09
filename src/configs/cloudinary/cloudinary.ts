import env from "../../constants/loadEnv/loadEnv";

export const CLOUDINARY_CONFIGRATION = {
  cloudName: env.CLOUD_NAME,
  uploadPreset: env.CLOUD_UPLOAD_PRESET,
  uploadUrl:`https://api.cloudinary.com/v1_1/${env.CLOUD_NAME}/image/upload`
};