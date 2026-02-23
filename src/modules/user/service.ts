import {
  changePasswordValidationSchema,
  loginValidationSchema,
  validationSchema,
  type createUserType,
  type loginType,
} from "./validators";
import { role } from "@/constant";
import z from "zod";
import logger from "@/config/logger";
import Model from "./model";
import type { UserColumn } from "./resource";
import { throwErrorOnValidation, throwNotFoundError } from "@/utils/error";
import { comparePassword, hashPassword } from "@/utils/hashPassword";
import Resource from "./resource";
import Token from "@/utils/token";
const list = async (params: any) => {
  try {
    const data: any = await Model.findAllAndCount(params);
    logger.debug("data ", data);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const create = async (input: createUserType) => {
  try {
    logger.info(`Creating user with input: ${JSON.stringify(input)}`);
    const { error, success } = await z.safeParseAsync(validationSchema, input);
    if (!success) {
      throwErrorOnValidation(
        error.issues.map((issue) => issue.message).join(", "),
      );
    }

    const { email, password } = input;

    const duplicateUser = await Model.find({ email });

    if (duplicateUser) {
      throwErrorOnValidation("User with this email already exists");
    }
    const hashedPw = await hashPassword(password);
    const user = await Model.create({ ...input, password: hashedPw } as any);
    logger.info(`User created successfully with email: ${email}`);
    const tokenPayload = {
      id: user!.id,
      email: user!.email,
      role: role.user,
    };
    const token = await Token.sign(tokenPayload, "30d");
    const jsonData = Resource.toJson(user as any);
    //include the token in the responce while making the user in the system
    return {
      ...jsonData,
      token,
    };
  } catch (err: any) {
    throw err;
  }
};
const getEventguest = async (eventid: number) => {};

const login = async (input: loginType) => {
  try {
    const result = loginValidationSchema.safeParse(input);

    if (!result.success) {
      throwErrorOnValidation(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }

    const user = await Model.find({ email: input.email });

    if (!user || !user.id) {
      throwErrorOnValidation("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(
      input.password,
      user!.password as string,
    );
    if (!isPasswordValid) {
      throwErrorOnValidation("Invalid credentials");
    }
    const tokenPayload = {
      id: user!.id,
      role: role.user,
      email: user!.email,
    };
    const token = await Token.sign(tokenPayload, "30d");

    return { token, user: Resource.toJson(user as any) };
  } catch (error) {
    throw error;
  }
};

const find = async (data: Partial<UserColumn>) => {
  try {
    if (!!data.email) {
      const user = await Model.find({ email: data.email });
      if (!user) {
        throwNotFoundError("User with the email was not found ");
      }
      return Resource.toJson(user as any);
    }
    if (!!data.id) {
      const user = await Model.find({ id: data.id });
      if (!user || user == null) {
        throwNotFoundError("User with the id was not found");
      }
      return Resource.toJson(user as any);
    }
  } catch (error) {
    throw error;
  }
};

const invite_user = async (input: any) => {
  try {
    console.log(input);
  } catch (err) {
    throw err;
  }
};

const vendor_event = async () => {}; // service to get the event for the vendor

const changePassword = async (input: any, id: number) => {
  try {
    const result = changePasswordValidationSchema.safeParse(input);
    if (!result.success) {
      throwErrorOnValidation(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }
    const { currentPassword, newPassword, confirmPassword } = input;
    // Check if new password and confirm password match and then return if there is not the match in the password
    if (newPassword !== confirmPassword) {
      return throwErrorOnValidation(
        "New password and confirm password do not match",
      );
    }
    const user = await Model.find({ id });
    if (!user) {
      throwNotFoundError("User");
    }
    const isCurrentPasswordValid = await comparePassword(
      currentPassword,
      user!.password as string,
    );
    if (!isCurrentPasswordValid) {
      throwErrorOnValidation("Current password is incorrect");
    }
    const hashedNewPassword = await hashPassword(newPassword);
    const updatePassword = await Model.update(
      { password: hashedNewPassword },
      id,
    );
    return Resource.toJson(updatePassword);
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    // Check if admin exists
    const admin = await Model.find({ id });

    if (!admin) {
      throwNotFoundError("Admin");
    }

    // Delete user
    await Model.destroy(id);

    logger.info(`User ${id} deleted successfully`);
    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};
export default {
  list,
  create,
  login,
  // logout,
  find,
  changePassword,
  remove,
  getEventguest,
};
