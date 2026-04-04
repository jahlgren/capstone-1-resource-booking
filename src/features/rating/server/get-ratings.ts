import db from "@/db";
import { rating } from "../model/rating";
import { eq, desc } from "drizzle-orm";

export async function getResourceRatings (resourceId: string) {
    const results = await db
        .select()
        .from(rating)
        .where(eq(rating.resourceId, resourceId))
        .orderBy(desc(rating.createdAt));
    return results;
}