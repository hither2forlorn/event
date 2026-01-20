import Joi from "joi";
import {imageValidationExtensions} from "@/constant";

const imageInputSchema = Joi.alternatives().try(
  Joi.object({
    base64: Joi.string().required(),
    extension: Joi.string()
      .valid(...imageValidationExtensions)
      .required(),
    id: Joi.number().optional(),
    filename: Joi.string().optional(),
  }),
  Joi.string().pattern(/^uploads\//)
);

export { imageInputSchema };
