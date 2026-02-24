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
    const data = await Service.update(Number(params.id), body);
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
    const data = await Service.remove(Number(params.id));
    return data;
  } catch (err: any) {
    throw err;
  }
};

export default { create, get, update, deleteFamily };
