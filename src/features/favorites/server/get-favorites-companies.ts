import db from "@/db";
import {resource} from "@/features/resource/model/resource";
import { eq } from "drizzle-orm";
import { favorites } from "@/features/favorites/model/favorites";
import { get } from "http";
import { stat } from "fs";

export async function getFavoriteResourcesByUserId(userId: string) {
    const favoriteResources = await db.select().from(resource)  
        .innerJoin(favorites, eq(resource.id, favorites.resourceId))
        .where(eq(favorites.userId, userId))
        .then((rows) => rows.map(({resource}) => ({...resource, isUserFavorite: true})));
    return favoriteResources;
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
