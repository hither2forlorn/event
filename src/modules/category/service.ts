import z from "zod"
import logger from "@/config/logger"
import { throwErrorOnValidation } from "@/utils/error"
import Model from "./model"
const list = async (params: any) => {
	try {
		const data: any = await Model.findAllAndCount(params);
		logger.debug("data ", data);
		return data;
	} catch (err: any) {
		throw err;
	}
}
export { list }
