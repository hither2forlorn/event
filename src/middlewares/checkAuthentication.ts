import logger from "@/config/logger";
import Token from "../utils/token";
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

    if (!token) {
      throw new Error("UNAUTHORIZED");
    }

    const tokenWithoutBearer = token.startsWith("Bearer")
      ? token.replace(/^Bearer\s+/i, "")
      : token;

    const decoded = await Token.verify(tokenWithoutBearer);

    if (!decoded) {
      console.log("This is the decoded thing in the user ");
      throw new Error("UNAUTHORIZED");
    } else {
      if (!Array.isArray(allowTo) || !allowTo?.length) {
        throw new Error("Unauthorized");
      } else {
        if (allowTo.includes("public")) {
          // Public route but with token
          let user = decoded;
          request.user = user;
          return;
        }
        await checkSpecificRole(decoded, allowTo); // For the authorization
        try {
          let user = decoded;
          request.user = user;
        } catch (err: any) {
          throw new Error(err.message || "Unauthorized");
        }
      }
    }
  } catch (err: any) {
    logger.error(err);
    throw new Error(err.message || "Unauthorized");
  }
};
export default checkAuthentication;
