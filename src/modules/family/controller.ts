import type { IAuthRequest } from "@/routes/index";
import Service from "./service";
import { throwErrorOnValidation } from "@/utils/error";

const create = async (req: IAuthRequest) => {
  try {
    const { body, user } = req;
    const data = await Service.create(body, user.id);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const getMyFamilies = async (req: IAuthRequest) => {
  try {
    const userId = req.user.id;
    const data = await Service.getMyFamilies(userId);
    return data;
  } catch (error) {
    throw error;
  }
};

const get = async (req: IAuthRequest) => {
  try {
    const { params } = req;
    if (!params.id || isNaN(Number(params.id))) {
      throwErrorOnValidation("Invalid ID");
    }
    const data = await Service.get(Number(params.id));
    return data;
  } catch (error) {
    throw error;
  }
};

const update = async (req: IAuthRequest) => {
  try {
    const { params, body } = req;
    if (!params.id || isNaN(Number(params.id))) {
      throwErrorOnValidation("Invalid ID");
    }
    const data = await Service.update(Number(params.id), body, req.user.id);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const deleteFamily = async (req: IAuthRequest) => {
  try {
    const { params } = req;
    if (!params.id || isNaN(Number(params.id))) {
      throwErrorOnValidation("Invalid ID");
    }
    const data = await Service.remove(Number(params.id), req.user.id);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const addMember = async (req: IAuthRequest) => {
  try {
    const { params, body } = req;

    const familyId = Number(params.id);

    const data = await Service.addMember(familyId, req.user.id, body);

    return data;
  } catch (error) {
    throw error;
  }
};

const getMembers = async (req: IAuthRequest) => {
  try {
    const familyId = Number(req.params.id);

    const data = await Service.listMembers(familyId);

    return data;
  } catch (error) {
    throw error;
  }
};

const getMemberDetails = async (req: IAuthRequest) => {
  try {
    const familyId = Number(req.params.id);
    const memberId = Number(req.params.memberId);

    const data = await Service.getMemberDetails(familyId, memberId);

    return data;
  } catch (error) {
    throw error;
  }
};

const updateMember = async (req: IAuthRequest) => {
  try {
    const familyId = Number(req.params.id);
    const memberId = Number(req.params.memberId);

    const data = await Service.updateMember(
      familyId,
      memberId,
      req.user.id,
      req.body,
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const deleteMember = async (req: IAuthRequest) => {
  try {
    const familyId = Number(req.params.id);
    const memberId = Number(req.params.memberId);

    const data = await Service.removeMember(familyId, memberId, req.user.id);

    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  get,
  update,
  deleteFamily,
  addMember,
  getMembers,
  getMemberDetails,
  updateMember,
  deleteMember,
  getMyFamilies,
};
