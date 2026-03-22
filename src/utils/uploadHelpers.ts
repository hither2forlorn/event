import cloudinary from "@/config/cloudinary";
import logger from "@/config/logger";

const uploadBufferToCloudinary = (
  buffer: Buffer,
): Promise<{ secureUrl: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "paperbank/users/profiles",
        resource_type: "image",
        type: "upload",
        transformation: [
          { width: 400, height: 400, crop: "fill", quality: "auto:good" },
        ],
      },
      (error, result) => {
        if (error) {
          logger.error(
            "Cloudinary upload error: " + String(error?.message || error),
          );
          return reject(error);
        }
        if (!result?.secure_url) {
          return reject(new Error("No secure_url returned from Cloudinary"));
        }
        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    stream.on("error", (error) => {
      logger.error("Stream error: " + String(error?.message || error));
      reject(error);
    });

    stream.end(buffer);
  });
};

const extractPublicId = (value: string): string | null => {
  try {
    if (!value) return null;

    if (!value.includes("res.cloudinary.com")) {
      return value.replace(/^\/+/, "").replace(/\.[^/.?]+$/, "") || null;
    }

    const parsed = new URL(value);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const uploadIdx = parts.findIndex((part) => part === "upload");

    if (uploadIdx === -1 || uploadIdx === parts.length - 1) return null;

    let publicIdParts = parts.slice(uploadIdx + 1);

    if (publicIdParts[0] && /^v\d+$/.test(publicIdParts[0])) {
      publicIdParts = publicIdParts.slice(1);
    }

    const publicId = publicIdParts.join("/").replace(/\.[^/.?]+$/, "");
    return publicId || null;
  } catch (error) {
    logger.error(
      "Error extracting Cloudinary public ID: " +
        String(error instanceof Error ? error.message : error),
    );
    return null;
  }
};

const deleteCloudinaryImage = async (
  publicIdOrUrl: string,
): Promise<boolean> => {
  try {
    const publicId = extractPublicId(publicIdOrUrl);
    if (!publicId) return false;

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      type: "upload",
    });

    return result.result === "ok";
  } catch (error) {
    logger.error(
      "Error deleting Cloudinary image: " +
        String(error instanceof Error ? error.message : error),
    );
    return false;
  }
};

export { deleteCloudinaryImage, extractPublicId, uploadBufferToCloudinary };
