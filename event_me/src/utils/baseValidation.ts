import joi from "joi"
import { imageValidationExtensions } from "@/constant"
const imageValidation = joi.object({
	base64: joi.string().max(14000000).required(),
	extension: joi.string().valid(...imageValidationExtensions).required()
}).optional();
export default imageValidation;

