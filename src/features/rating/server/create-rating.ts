import db from "@/db";
import { rating } from "../model/rating";
import { createId } from "@paralleldrive/cuid2";
import { CreateRatingInput } from "../validation/create-rating-validator";

export async function createRating(input: CreateRatingInput) {
    const data = await db.insert(rating).values({
        id: createId(),
        userId: input.userId,
        resourceId: input.resourceId,
        stars: input.stars,
        comment: input.comment,
    }).returning();

    if(!data.length) throw new Error("Failed to create rating");
    return data[0];
}