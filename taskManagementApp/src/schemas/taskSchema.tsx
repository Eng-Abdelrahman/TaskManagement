import { z } from "zod";


export const taskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  assignedUserId: z
    .string()
    .min(1, { message: "Assigned User ID is required" })
    .regex(/^\d+$/, { message: "Assigned User ID must be a number" }),
  startDate: z.string().refine(
    (date) => !isNaN(new Date(date).getTime()),
    { message: "Start Date must be a valid date" }
  ),
  endDate: z.string().refine(
    (date) => !isNaN(new Date(date).getTime()),
    { message: "End Date must be a valid date" }
  ),
  isCompleted: z.boolean(),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End Date must be after Start Date",
  path: ["endDate"],
});

export type TaskFormData = z.infer<typeof taskSchema>;