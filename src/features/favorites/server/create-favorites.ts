import db from "../../../db";
import { favorites } from "../model/favorites";
import { Favorites } from "../types/favorites";

export const createFavorite = async (userId: string, resourceId: string): Promise<Favorites> => {
    const results = await db.insert(favorites).values({
        userId,
        resourceId,
    }).returning();
    return results[0];
};