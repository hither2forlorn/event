import logger from "@/config/logger";
import rsvpRepository from "./repository";
import { throwErrorOnValidation } from "@/utils/error";
import z from "zod";
import { validationSchema } from "./validators";

const create = async (input: any) => {
  try {
    logger.info(`Creating RSVP with input: ${JSON.stringify(input)}`);
    const { error, success } = await z.safeParseAsync(validationSchema, input);
    if (!success) {
      throwErrorOnValidation(
        error.issues.map((issue) => issue.message).join(", "),
      );
    }
    const rsvp = await rsvpRepository.create(input);
    logger.info(`RSVP created successfully with id: ${rsvp.id}`);
    return rsvp;
  } catch (err: any) {
    throw err;
  }
};

export default {
  create,
};
