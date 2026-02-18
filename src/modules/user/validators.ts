import z from "zod";
const loginValidationSchema = z.object({
	email: z.string().nonempty(),
	password: z.string().nonempty(),
	// deviceToken: z.string().nonempty(),
});
const changePasswordValidationSchema = z.object({
	currentPassword: z.string().min(8).nonempty(),
	newPassword: z.string().min(8).nonempty(),
	confirmPassword: z.string(),
});

const validationSchema = z.object({
	userName: z.string(),




});

type createUserType = z.infer<typeof validationSchema>;
type loginType = z.infer<typeof loginValidationSchema>;

export {
	loginValidationSchema,
	changePasswordValidationSchema,
	validationSchema,
	type createUserType,
	type loginType,
};
