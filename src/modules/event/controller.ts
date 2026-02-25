import { type IAuthRequest } from "@/routes/index";
import Service from "./service";
import { throwErrorOnValidation } from "@/utils/error";

const get = async (req: IAuthRequest) => {
  try {
    const data = await Service.list(req?.query);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const create = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    const data = await Service.create(
      { ...req.body, organizer: userId },
      userId,
    );
    return data;
  } catch (err: any) {
    throw err;
  }
};

const findOne = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid ID");
    }
    const data = await Service.find(Number(id));
    return data;
  } catch (err: any) {
    throw err;
  }
};

const update = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid ID");
    }
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }

    const data = await Service.update(Number(id), req.body, userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const deleteModule = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid ID");
    }
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    const data = await Service.remove(Number(id), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const listMyEvents = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    const data = await Service.listMyEvents(userId, req.query);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const getUserRelatedToEvent = async (req: IAuthRequest) => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.id;

    if (!eventId || isNaN(Number(eventId))) {
      throwErrorOnValidation("Invalid Event ID");
    }
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }

    const data = await Service.getUserRelatedToEvent(Number(eventId), userId);
    return data;
  } catch (error: any) {
    throw error;
  }
};
const sendEventinvitaion = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    const data = await Service.inviteGuest(req.body, userId);
    return data;
  } catch (error: any) {
    throw error;
  }
};
const getEventGuest = async (req: IAuthRequest) => {
  try {
    const { eventId } = req.params;
    const { id } = req.user;
    if (!eventId) {
      throwErrorOnValidation(
        "Event id was not found in the params"
      )
      const data = await Service.getEventguest(eventId, id);
      return data;
    }
  }
  catch (err) {
    throw err;
  }

}
export default {
  get,
  create,
  findOne,
  getEventGuest,
  update,
  deleteModule,
  listMyEvents,
  getUserRelatedToEvent,
  sendEventinvitaion
};
