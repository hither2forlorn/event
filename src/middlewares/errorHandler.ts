import {type Express,type Request,type Response,type NextFunction } from "express";
import logger from "./../config/logger";
import { HTTP_STATUS } from "../utils/error";

const errorHandler = (app: Express) => {
	// Express error handling middleware
	app.use((err: any, _: Request, res: Response, __: NextFunction) => {
		logger.error(err);
		
		let statusCode = 500;
		let errorResponse: any = {
			success: false,
			error: "An unexpected error occurred",
			message: err?.message || "Something went wrong",
		};

		if (err?.name === "ValidationError" || err?.name === "Validation Error" || err?.message?.includes("ValidationError")) {
			statusCode = HTTP_STATUS.VALIDATION_ERROR;
			errorResponse = {
				success: false,
				error: "Validation Error",
				message: err.message,
			};
		} else if (err?.name === "UNAUTHORIZED" || err?.message?.includes("UNAUTHORIZED")) {
			statusCode = HTTP_STATUS.UNAUTHORIZED;
			errorResponse = {
				success: false,
				error: "UNAUTHORIZED: You cannot access the data",
				message: err.message,
			};
		} else if (err?.name === "NOT_FOUND" || err?.message?.includes("NOT_FOUND")) {
			statusCode = HTTP_STATUS.NOT_FOUND;
			errorResponse = {
				success: false,
				error: "Validation Error",
				message: err.message,
			};
		} else if (err?.name === "Forbidden" || err?.message?.includes("Forbidden:")) {
			statusCode = HTTP_STATUS.FORBIDDEN;
			errorResponse = {
				success: false,
				error: "Forbiddon Error",
				message: err.message,
			};
		}

		res.status(statusCode).json(errorResponse);
	});
};

export default errorHandler;
