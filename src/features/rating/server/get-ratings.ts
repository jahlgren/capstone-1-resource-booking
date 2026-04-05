import db from "@/db";
import { rating } from "../model/rating";
import { user } from "@/features/auth/models/user";
import { eq, desc } from "drizzle-orm";

export async function getResourceRatings(resourceId: string) {
    const results = await db
        .select({
            id: rating.id,
            userId: rating.userId,
            resourceId: rating.resourceId,
            stars: rating.stars,
            comment: rating.comment,
            createdAt: rating.createdAt,
            reviewerName: user.name,
            reviewerImage: user.image,
        })
        .from(rating)
        .leftJoin(user, eq(rating.userId, user.id))
        .where(eq(rating.resourceId, resourceId))
        .orderBy(desc(rating.createdAt));
    return results;
}