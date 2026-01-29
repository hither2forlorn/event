import z from "zod";



const validationSchema = z.object({
  email: z.string().nonempty(),
  password: z.string().min(8).nonempty(),
});

type createGuestType = z.infer<typeof validationSchema>;

export {

  validationSchema,
  type createGuestType,
};
