import { z } from "zod";

export const createRatingSchema = z.object({
    stars: z.number().int().min(1).max(5),
    comment: z.string().max(500).optional(),
    resourceId: z.string(),
    userId: z.string(),
});

export type CreateRatingInput = z.infer<typeof createRatingSchema>;