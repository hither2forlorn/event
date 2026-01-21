import {
  changePasswordValidationSchema,
  loginValidationSchema,
  validationSchema,
  type createAdminType,
  type loginType,
} from "./validators";
import z from "zod";
import logger from "@/config/logger";
import Model from "./model";
import { throwErrorOnValidation } from "@/utils/error";
import { comparePassword, hashPassword } from "@/utils/hashPassword";
import { sign } from "jsonwebtoken";
const list = async (params: any) => {
  try {
    const data: any = await Model.findAllAndCount(params);
    logger.debug("data ", data);
    return data;
  } catch (err: any) {
    throw err;
  }
};
const verify_retailer = async (params: any, retailerId: number) => {
  console.log("verify_retailer - params:", params, "retailerId:", retailerId);
};
const create = async (input: createAdminType) => {
  try {
    console.log("create - input:", input);
    const { error, success } = await z.safeParseAsync(validationSchema, input);
    if (!success) {
      console.log("This is the failute");
      throwErrorOnValidation(
        error.issues.map((issue) => issue.message).join(", "),
      );
    }

    const { email, password } = input;

    const duplicateAdmin = await Model.find({ email });

    if (duplicateAdmin) {
      throwErrorOnValidation("Already exists");
    }

    const hashedPw = await hashPassword(password);

    const admin = await Model.create({ ...input, password: hashedPw });

    console.log("data");
    return admin;
  } catch (err: any) {
    throw err;
  }
};
const login = async (input: loginType) => {
  try {
    const admin = await Model.find({ email: input.email });

    if (!admin || !admin.id) {
      return throwErrorOnValidation("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(
      input.password,
      admin.password,
    );

    if (!isPasswordValid) {
      throwErrorOnValidation("Invalid credentials");
    }

    const tokenPayload = {
      id: admin.id,
      email: admin.email,
    };

    const token = sign(tokenPayload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    throw error;
  }
};

const logout = async (input: any, id: number) => {
  console.log("logout - input:", input, "id:", id);
};
const find = async (id: number) => {
  console.log("find - id:", id);
};
const changePassword = async (input: any, id: number) => {
  console.log("changePassword - input:", input, "id:", id);
};

const remove = async (id: number) => {
  console.log("remove - id:", id);
};
export default {
  list,
  create,
  login,
  logout,
  find,
  changePassword,
  verify_retailer,
  remove,
};
