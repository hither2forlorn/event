import {
  changePasswordValidationSchema,
  loginValidationSchema,
  validationSchema,
  type createUserType,
  type loginType,
} from "./validators";
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
    return Resource.toJson(user as any);
  } catch (err: any) {
    throw err;
  }
};
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
      email: user!.email,
      role: user!.role,
    };

    const token = await Token.sign(tokenPayload, "7d");

    logger.info(`User ${user!.id} logged in successfully`);
    return { token, user: Resource.toJson(user as any) };
  } catch (error) {
    throw error;
  }
};

// const logout = async (id: number) => {
//   try {
//     const admin = await Model.find({ id });

//     if (!admin) {
//       throwNotFoundError("Admin");
//     }

//     logger.info(`Admin ${id} logged out successfully`);
//     return { message: "Logged out successfully" };
//   } catch (error) {
//     throw error;
//   }
// };

const find = async (data: Partial<UserColumn>) => {
  try {
    if (!!data.email) {
      const user = await Model.find({ email: data.email });
      if (!user) {
        throwNotFoundError("User");
      }
      return Resource.toJson(user as any);
    }
    if (!!data.id) {
      const user = await Model.find({ email: data.email });
      if (!user) {
        throwNotFoundError("User");
      }
      return Resource.toJson(user as any);
    }
  } catch (error) {
    throw error;
  }
};

const changePassword = async (input: any, id: number) => {
  try {
    const result = changePasswordValidationSchema.safeParse(input);

    if (!result.success) {
      throwErrorOnValidation(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }

    const { currentPassword, newPassword, confirmPassword } = input;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      throwErrorOnValidation("New password and confirm password do not match");
    }

    // Find user
    const user = await Model.find({ id });

    if (!user) {
      throwNotFoundError("User");
    }

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(
      currentPassword,
      user!.password as string,
    );

    if (!isCurrentPasswordValid) {
      throwErrorOnValidation("Current password is incorrect");
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    const updatedAdmin = await Model.update(
      { password: hashedNewPassword },
      id,
    );

    logger.info(`Password changed successfully for admin ${id}`);
    return Resource.toJson(updatedAdmin as any);
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
};
