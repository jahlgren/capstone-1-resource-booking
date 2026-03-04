import { user } from "@/features/auth/models/user";
import { z } from "zod";

export const createRoesourceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    userId: z.string().min(1, "User ID is required")
});

export type CreateResourceInput = z.infer<typeof createRoesourceSchema>;