import multer from "multer";
import type { RequestHandler } from "express";

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedMimes.includes(file.mimetype)) {
    return cb(
      new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed."),
    );
  }

  cb(null, true);
};

const uploadProfilePicture: RequestHandler = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("photo");

export { uploadProfilePicture };
