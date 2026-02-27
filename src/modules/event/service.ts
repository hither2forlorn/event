import Model from "./model";
import Resource from "./resource";
import logger from "@/config/logger";
import FamilyModel from "@/modules/family/model"
import {
  EventInvitation,
  EventUpdateValidationSchema,
  EventValidationSchema,
  type EventInvitationType,
  type updateEventType,
} from "./validators";
import UserService from "@/modules/user/service";
import RSVP from "../rsvp/service";
import crypto from "crypto";
import { throwErrorOnValidation, throwNotFoundError, throwUnauthorizedError, throwForbiddenError } from "@/utils/error";
import { UserColumn } from "../user/resource";

const list = async (params: any) => {
  try {
    const data = await Model.findAllAndCount(params);
    const mapped_data = data.items.map((event) => {
      return {
        ...event,
        role: event.organizer == params.userId ? "Organizer" : "Guest"
      }
    })
    return {
      items: Resource.collection(mapped_data),
    };
  } catch (err: any) {
    logger.error("Error in Category listing:", err);
    throw err;
  }
};

const getEventguest = async (eventid: number, userId: number) => {
  try {
    const isAllowed = await checkAuthorized(eventid, userId);
    if (!isAllowed) {
      return throwUnauthorizedError("User with the details cannot get the information of the guest ");
    }
    const event_guest = Model.getEventGuest(eventid);
    return event_guest;
  } catch (err) {
    throw err;
  }
};

const getEventVendor = async (eventid: number) => {
  try {
    const event_information = find(eventid);
    if (!event_information) {
      return throwNotFoundError("Event with the event id was not found in the db ");
    }
    const eventVendor = await Model.getEventVendor(eventid);
    return eventVendor;
  } catch (err) {
    throw err;
  }
};

const inviteGuest = async (input: EventInvitationType, userId: number) => {
  try {
    const result = EventInvitation.safeParse(input);
    if (!result.success) {
      throw new Error(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }
    const isValid = await checkAuthorized(input.eventId, userId);
    if (!isValid) {
      return throwErrorOnValidation("Unauthorized: You are not the organizer of this event");
    }

    const { fullName, email, phone, eventId, isFamily } = input;
    let guestUser: Partial<UserColumn> | undefined;
    if (email) {
      try {
        guestUser = (await UserService.list({ email, phone })).items[0] // get the user with the email and the phone
      } catch (err) {
        throw err;
      }
    }
    if (!guestUser) { // No user with the email or overall no user found 
      const randomPassword = crypto.randomBytes(8).toString("hex");
      const placeholderEmail = email || `guest_${Date.now()}_${Math.floor(Math.random() * 1000)}@khumbaya.com`;
      const placeholderPhone = phone || `+977${Date.now()}`;
      guestUser = await UserService.create({
        username: fullName,
        email: placeholderEmail,
        password: randomPassword,
        phone: placeholderPhone,
      });
    }
    if (!guestUser) throw new Error("Error while making the user ")
    if (isFamily && !guestUser.familyId) {
      //Making the family table and then upadaing the guest family id 
      const userFamily = await FamilyModel.create({
        createdBy: guestUser.id!,
        familyName: `${guestUser}'s Family`,

      })
      guestUser.familyId = userFamily?.id;
    }

    // 2. Create RSVP (Invitation) entry
    const invitation = await RSVP.create({
      eventId: eventId,
      userId: guestUser.id!,
      familyId: isFamily ? guestUser.familyId : undefined,
      invited_by: userId,
      status: "Pending",
    });

    if (!invitation) {
      throw new Error("Failed to create invitation");
    }

    return {
      ...guestUser,
      invitationId: invitation.id,
      role: "GUEST",
    };
  } catch (err: any) {
    logger.error("Error in inviting guest:", err);
    throw err;
  }
};

const create = async (input: any, userId: number) => {
  try {
    // eventValidation.parse(input);
    const result = EventValidationSchema.safeParse(input);
    if (!result.success) {
      throw new Error(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }

    const eventData = {
      ...input,
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
    };


    const data = await Model.create(eventData);
    if (!data || !data.organizer) {
      throw new Error("Event creation failed");
    }
    const eventMember = await Model.makeeEventOwner(data.id, userId);
    if (data == undefined || eventMember == undefined) {
      throw new Error("Something went wrong ");
    }
    return { ...Resource.toJson(data), ownerShipId: eventMember.id };
  } catch (err: any) {
    logger.error("Error in Event creation:", err);
    throw err;
  }
};

const find = async (id: number) => {
  try {
    console.log('finding the event with the id', id);
    const data = await Model.find({ id });
    if (!data) throw new Error("Event not found");
    return Resource.toJson(data);
  } catch (err: any) {
    logger.error("Error in event finding:", err);
    throw err;
  }
};
const getInvitedGuest = async (eventId: number, userId: number) => {
  try {
    const isAuthorized = await checkAuthorized(eventId, userId);
    if (!isAuthorized) {
      return throwForbiddenError("Not allowed to get the guest for this event");
    }

    const invitedGuest = await Model.getInvitedGuest(eventId);
    return invitedGuest;
  } catch (err: any) {
    logger.error(err, "Error in getInvitedGuest service");
    throw err;
  }
};

const checkAuthorized = async (id: number, userId?: number) => {
  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  const event = await find(id);
  if (!event) return throwNotFoundError("Event not found");
  //if the event organizer is not the person also check the organizer family and then also 
  if (event.organizer !== userId) {
    throw new Error("Unauthorized: You are not the organizer of this event");
  }

  return event;
};

const update = async (id: number, input: updateEventType, userId?: number) => {
  try {
    await checkAuthorized(id, userId);
    const result = EventUpdateValidationSchema.safeParse(input);

    if (!result.success) {
      throw new Error(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }

    const eventData: any = {
      ...input,
      ...(input.startDate && { startDate: new Date(input.startDate) }),
      ...(input.endDate && { endDate: new Date(input.endDate) }),
    };

    const data = await Model.update(eventData, id);
    if (!data) throw new Error("Event not found or update failed");
    return Resource.toJson(data as any);
  } catch (err: any) {
    logger.error("Error in event update:", err);
    throw err;
  }
};

const remove = async (id: number, userId?: number) => {
  try {
    await checkAuthorized(id, userId);
    const data = await Model.destroy(id);

    if (!data || data.length === 0) {
      throw new Error("Event not found or already deleted");
    }

    return {
      success: true,
      message: "Event deleted successfully",
      deletedEvent: Resource.toJson(data[0] as any),
    };
  } catch (err: any) {
    logger.error("Error in event deletion:", err);
    throw err;
  }
};

const listMyEvents = async (userId: number, params: any) => {
  try {
    const allParams = { ...params, organizer: userId };
    const data = await Model.findByUser(userId, allParams);
    return {
      ...data,
      items: data.items.map((item: any) => ({
        ...Resource.toJson(item.event as any),
        role: item.user_event?.role,
      })),
    };
  } catch (err: any) {
    logger.error("Error in Event listing by user:", err);
    throw err;
  }
};

const getUserRelatedToEvent = async (eventId: number, userId: number) => {
  try {
    await checkAuthorized(eventId, userId);

    const data = await Model.getEventMember(eventId);
    return {
      eventId,
      users: data,
      totalUsers: data.length,
    };
  } catch (error: any) {
    logger.error("Error in getting users related to event:", error);
    throw error;
  }
};

const makeEventGuest = async (eventId: number, guestId: number, inviterId: number, familyId: number | null) => {
  try {
    const data = await Model.makeEventGuest(eventId, guestId, inviterId, familyId);
    return data;
  } catch (error: any) {
    logger.error("Error in making event guest:", error);
    throw error;
  }
};

export default {
  list,
  create,
  find,
  update,
  remove,
  listMyEvents,
  inviteGuest,
  makeEventGuest,
  getEventguest,
  getInvitedGuest,
  getUserRelatedToEvent,
  getEventVendor,
};
