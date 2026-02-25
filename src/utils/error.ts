import { HTTP_ERROR_LITERALS } from "./helper";
export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	VALIDATION_ERROR: 422,
	INTERNAL_SERVER_ERROR: 500
} as const;
// Validation Error Thrower
export const throwErrorOnValidation = (validationstring: string) => {
	const errorMessage = new Error(`${HTTP_ERROR_LITERALS.VALIDATIONERROR} ${validationstring}`);
	errorMessage.name = "ValidationError";
	throw errorMessage;
}
export const throwNotFoundError = (resource: string): never => {
	const error = new Error(`NOT_FOUND: ${resource} not found`);
	error.name = "NOT_FOUND";
	throw error;
}
export const throwUnauthorizedError = (message: string = "Unauthorized access") => {
	const error = new Error(`UNAUTHORIZED: ${message}`);
	error.name = "UNAUTHORIZED";
	throw error;
};

export const throwForbiddenError = (message: string = "Access denied") => {
	const error = new Error(`Forbidden: ${message}`);
	error.name = "Forbidden";
	throw error;
};

