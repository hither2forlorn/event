import type { IAuthRequest } from "@/routes/index";
import Service from "./service";
import logger from "@/config/logger";
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
const accept = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const acceptResponse = await Service.acceptRSVP(id);
    return acceptResponse;

  } catch (err) {
    throw err

  }
}
const getInvitations = async (req: IAuthRequest) => {
  try {
    const invitations = await Service.getInvitedEvent(req.query, req.user.id);
    return invitations;
  } catch (err) {
    throw err;
  }
};
export default {
  create,
  accept,
  getInvitations,
};
