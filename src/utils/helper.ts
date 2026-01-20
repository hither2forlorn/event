import db from "@/config/db"
import Decimal from "decimal.js"
import { readFileSync } from "fs"
import logger from "@/config/logger"
export type ValidationReturnType = {
	isValid: boolean,
	errors: string[],
	data: any
}
export const ErrorLiteral = {
	ALREADY_EXIST: "Error : Data already exists",
	UNAUTHORIZED: "UNAUTHORIZED:Cannot access the data ",


}
export const doesExistCheck = async (tableName: any, whereArray: [any]) => {
	const exist = await db.select().from(tableName).where(...whereArray)
	if (exist.length != 0 && exist.length > 0) {
		return true;
	} else {
		return false;
	}
}
export const image_from_link = async (imagelink: string) => {
	try {
		const image = await readFileSync(imagelink, { encoding: "base64" });
		const extension = imagelink.split(".").pop();
		return {
			base64: image,
			extension
		}
	}
	catch (err) {
		logger.error(err);
		return imagelink;
	}
}
export const commission_calculator = (amount: number, commission_rate: number) => {
	const decimalamount = new Decimal(amount / 100)
	const commission = Decimal(commission_rate).mul(decimalamount);
	console.log('This is the commission of the user in the wallet ', commission);
	return commission;
}
export const formatDate = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");
	const formattedDateTime = `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
	return formattedDateTime;
};

