import logger from "@/config/logger";
import Model from "./model";
import { throwErrorOnValidation } from "@/utils/error";
import z from "zod";
import { validationRSVP } from "./validators";

import EventService from "../event/service";

const create = async (input: any) => {
  try {
    logger.info(`Creating RSVP with input: ${JSON.stringify(input)}`);
    const { error, success } = await z.safeParseAsync(validationRSVP, input);
    if (!success) {
      throwErrorOnValidation(
        error.issues.map((issue) => issue.message).join(", "),
      );
    }
    const rsvp = await Model.create(input);
    if (!rsvp) {
      throw new Error("Failed to create RSVP");
    }
    logger.info(`RSVP created successfully with id: ${rsvp.id}`);
    return rsvp;
  } catch (err: any) {
    throw err;
  }
};
const acceptRSVP = async (rsvpId: number) => {
  try {
    logger.info(`Accepting RSVP with id: ${rsvpId}`);
    const rsvp = await Model.update({ status: "Accepted" }, rsvpId);
    if (!rsvp) {
      throw new Error(`RSVP with id ${rsvpId} not found`);
    }

    // When RSVP is accepted, create an Event Guest entry
    if (rsvp.eventId && rsvp.userId) {
      await EventService.makeEventGuest(
        rsvp.eventId,
        rsvp.userId,
        rsvp.invited_by,
        rsvp.familyId
      );
    }
    // make the service function that will take the user id when there is the family entity checklisted then the user will be able to make the event Guest entry from there 
    // this will make the user not involving one self to the event possible 
    logger.info(`RSVP with id ${rsvpId} accepted and event guest created.`);
    return rsvp;
  } catch (err: any) {
    throw err;
  }
}
export default {
  create,
  acceptRSVP,
};
