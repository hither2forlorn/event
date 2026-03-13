import logger from "@/config/logger";
import UserService from "@/modules/user/service"
import Token from "../utils/token";
import { throwForbiddenError } from "@/utils/error";
const checkSpecificRole = async (user: any, allowTo: string[]) => {
  if (user.role === "admin") {
    return user;
  }

  console.log(allowTo);
  console.log(user.role);
  if (!allowTo.includes(user?.role)) {
    //Or Admin bypass
    throw new Error("Unauthorized");
  }
  return user;
};
const checkAuthentication = async (request: any, allowTo: string[]) => {
  try {
    const token = request.headers["authorization"];
    console.log(token);

    if (!token) {
      throw new Error("UNAUTHORIZED");
    }

    const tokenWithoutBearer = token.startsWith("Bearer")
      ? token.replace(/^Bearer\s+/i, "")
      : token;

    const decoded = await Token.verify(tokenWithoutBearer);

    if (!decoded) {
      throw new Error("UNAUTHORIZED");
    } else {
      //Check the user in the system make the each req check
      if (decoded) {
        console.log(`This is the decoded in the system ${JSON.stringify(decoded)}`);
        if (decoded.role == "user") {
          const userdb = await UserService.find({ id: decoded.id })
          let user = decoded;
          user.familyId = userdb?.familyId;
          request.user = user;
          if (!user) return throwForbiddenError;
        }
      }
      if (!Array.isArray(allowTo) || !allowTo?.length) {
      } else {
        await checkSpecificRole(decoded, allowTo); // For the authorization
        try {
          let user = decoded;
          console.log("Authenticated user:", user);
          request.user = user;
        } catch (err: any) {
          throw new Error(err.message || "Unauthorized");
        }
      }
      return;
    }
  } catch (err: any) {
    logger.error(err);
    throw new Error(err.message || "Unauthorized");
  }
};
export default checkAuthentication;
