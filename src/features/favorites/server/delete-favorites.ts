import db from "@/db";
import { favorites } from "../model/favorites";
import { and, eq } from "drizzle-orm";

export const deleteFavorite = async (userId: string, resourceId: string) => {
    const results = await db.delete(favorites).where(
        and(eq(favorites.userId, userId), eq(favorites.resourceId, resourceId))
    ).returning();
    return results[0];
}

