import jwt from "jsonwebtoken";
import env from "../config/env";
import crypto from "crypto";
import bcrypt from "bcryptjs";
const sign = async (params: any, expiresIn: string) => {
  const secret: string = env.JWT_SECRET;
  // @ts-ignore
  const token = jwt.sign(params, secret, {
    expiresIn,
  });
  return token;
};
const hashPassword = async (token: any) => {
  const hashedPassword = bcrypt.hashSync(token, 10);
  return hashedPassword;
};
const verify = async (token: any) => {
  const secret = env.JWT_SECRET || "";
  const splitToken: any = token.split(" ").pop();
  console.log("the token", splitToken, "is under verification", secret);
  const decoded: any = jwt.verify(splitToken, secret);
  if (!!decoded?.id) {
    return decoded;
  } else {
    return null;
  }
};

const generateTemp = async (obj: any, minutes = 10) => {
  obj.expiredAt = new Date();
  obj.expiredAt.setMinutes(obj.expiredAt.getMinutes() + minutes);
  const jsonStringify = JSON.stringify(obj);
  const encodeData = Buffer.from(jsonStringify).toString("base64");
  const signature = crypto
    .createHmac("sha256", env.JWT_SECRET)
    .update(encodeData)
    .digest("hex");
  return `${encodeData}.${signature}`;
};
const tempPasswordGenerator = (length = 8) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const reverseTemp = async (token: string) => {
  try {
    const currentDate = new Date();
    console.log(token);
    const split = token.split(".");
    console.log("This is causing error ");
    if (split.length !== 2) {
      return false;
    }
    const [encodedData, signature] = split;
    console.log(
      "this is the encoded data and the split data ",
      encodedData,
      signature,
    );

    const calculatedSignature = crypto
      .createHmac("sha256", `${env.JWT_SECRET}`)
      .update(encodedData ?? "")
      .digest("hex");
    if (signature !== calculatedSignature) {
      return false;
    }
    const decoded = Buffer.from(encodedData ?? "", "base64").toString("utf-8");
    const obj = JSON.parse(decoded);
    if (obj.expiredAt < currentDate) {
      return false;
    }
    return obj;
  } catch (err) {
    console.log("This is the token for the retailerr ");
    throw new Error("Invalid Token");
  }
};
export default {
  sign,
  verify,
  hashPassword,
  generateTemp,
  reverseTemp,
  tempPasswordGenerator,
};
