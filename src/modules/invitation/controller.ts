import type { IAuthRequest } from "@/routes/index";
import Service from "./service";
import logger from "@/config/logger";
import { throwErrorOnValidation } from "@/utils/error";
const create = async (req: IAuthRequest) => {
  try {
    //GUest of the event , 
    const rsvp = await Service.create({
      ...req.body,
      userId: req.user.id,
    });
    if (!rsvp) {
      throw new Error("Failed to create RSVP");
    }
    logger.info(`RSVP created successfully with id: ${rsvp.id}`);
    return rsvp;
  } catch (err: any) {
    throw err;
  }
}
//Accept the event invitation
const accept = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid RSVP ID");
    }

    const acceptResponse = await Service.acceptRSVP(Number(id), req.user?.id);
    return acceptResponse;

  } catch (err) {
    throw err

  }
}
//Reject the event invitation
const reject = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid RSVP ID");
    }

    const rejectResponse = await Service.rejectRSVP(Number(id), req.user?.id);
    return rejectResponse;
  } catch (err) {
    throw err;
  }
};
// list of event invited for user and the family associate with the reqested user
const getInvitations = async (req: IAuthRequest) => {
  try {
    const invitations = await Service.getInvitedEvent(req.query, req.user.id);
    return invitations;
  } catch (err) {
    throw err;
  }
};

const getInvitationResponse = async (req: IAuthRequest) => {
  try {
    const eventId = Number(req.params.eventId);
    const userId = req.user.id;
    const familyId = req.user.familyId;
    if (!eventId || Number.isNaN(eventId)) {
      throwErrorOnValidation("eventId is required");
    }
    if (!familyId && !userId) {
      throwErrorOnValidation("Either familyId or userId is required");
    }
    console.debug(`The event id in the service is ${eventId}`)
    return await Service.listinvitationsResponce(Number(eventId), {
      familyId: familyId !== undefined ? Number(familyId) : undefined,
      userId: Number(userId),
    });
  } catch (err) {
    throw err;
  }
};

const setResponce = async (req: IAuthRequest) => {
  try {
    const userId = req.user.id;
    const eventId = Number(req.params.eventId);
    const familyId = req.user.familyId;
    if (!eventId || Number.isNaN(eventId)) {
      throwErrorOnValidation("valid eventId is required");
    }

    // userId in body is target user for whom response is set
    const service = await Service.setResponce(
      {
        ...req.body,
        eventId,
        userId: Number(req.body.userId),
        familyId: req.body.familyId,
      },
      userId,
      familyId,
    );
    return service;
  } catch (err) {
    throw err;

  }

}
//updateresponce  ( individual )
export default {
  create,
  setResponce,
  accept,
  reject,
  getInvitations,
  getInvitationResponse,

};
