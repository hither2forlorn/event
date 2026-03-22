import { v2 as cloudinary } from "cloudinary";
import env from "@/config/env";

if (
  !env.CLOUDINARY_CLOUD_NAME ||
  !env.CLOUDINARY_API_KEY ||
  !env.CLOUDINARY_API_SECRET
) {
  throw new Error(
    "Cloudinary credentials are missing in environment variables",
  );
}

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
  signature_algorithm: "sha256",
});

export default cloudinary;
