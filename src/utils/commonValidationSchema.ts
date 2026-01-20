import z from "zod";
import { imageValidationExtensions } from "@/constant";

const imageInputSchema = z.union([
	z.object({
		base64: z.string(),
		extension: z.string().refine(
			(ext) => imageValidationExtensions.includes(ext),
			{ message: "Invalid image extension" }
		),
		id: z.number().optional(),
		filename: z.string().optional(),
	}),
	z.string().regex(/^uploads\//, { message: "Must be a valid upload path" })
]);

export { imageInputSchema };
