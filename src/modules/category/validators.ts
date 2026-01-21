import { z } from "zod";

const categoryValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    question: z.any().optional(),
});

export { categoryValidationSchema };
