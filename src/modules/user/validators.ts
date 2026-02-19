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

const updateValidation = z.object({
	userName: z.string(),
	avatar: z.string(),
	password: z.string(),
	email: z.string()
})

const validationSchema = z.object({
	username: z.string(),
	password: z.string(),
	email: z.string()
});

type createUserType = z.infer<typeof validationSchema>;
type loginType = z.infer<typeof loginValidationSchema>;
type updateType = z.infer<typeof updateValidation>;
export {
	loginValidationSchema,
	changePasswordValidationSchema,
	validationSchema,
	updateValidation,
	type createUserType,
	type loginType,
	type updateType,
};
