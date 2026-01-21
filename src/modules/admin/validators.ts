import z from "zod";
const loginValidationSchema = z.object({
	username: z.string().nonempty(),
	password: z.string().nonempty(),
	deviceToken: z.string().nonempty(),
	host: z.string().nonempty(),
	userAgent: z.string().nonempty(),
});
const changePasswordValidationSchema = z.object({
	currentPassword: z.string().min(8).nonempty(),
	newPassword: z.string().min(8).nonempty(),
	confirmPassword: z.string(),
});
const updateRetailerInfo = z.object({
	retailer_id: z.string().nonempty(),
	commission_rate: z.number(),
	verify: z.boolean(),
});
const validationSchema = z.object({
	email: z.string().nonempty(),
	password: z.string().min(8).nonempty(),

});
export {
	updateRetailerInfo,
	loginValidationSchema,
	changePasswordValidationSchema,
	validationSchema,
};
