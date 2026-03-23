import db from "@/db";
import { eq } from "drizzle-orm";
import { favorites } from "@/features/favorites/model/favorites";
import type { Favorites } from "../types/favorites";

export async function getFavoriteResourcesByUserId(userId: string) {
    // Return the favorites rows so the client can use `resourceId` to determine
    // whether a resource is favorited.
    return db
        .select()
        .from(favorites)
        .where(eq(favorites.userId, userId)) as Promise<Favorites[]>;
}


export async function getFavoriteResourceIdsByUserId(userId: string) {
    try{
        const favorites = await getFavoriteResourcesByUserId(userId);
        return { status: "success", body: favorites };
    } catch (error) {
        console.error("Error fetching favorite resource IDs:", error);
        throw error;
    }
    
}
