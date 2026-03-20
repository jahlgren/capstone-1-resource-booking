import { auth } from "@/features/auth/server/auth-server";
import { createFavorite } from "@/features/favorites/server/create-favorites";
import { getFavoriteResourcesByUserId } from "@/features/favorites/server/get-favorites-companies";
import { headers } from "next/headers";
import { deleteFavorite } from "@/features/favorites/server/delete-favorites";

export async function GET() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    try {
        const favorites = await getFavoriteResourcesByUserId(session.user.id);
        return new Response(JSON.stringify(favorites), { status: 200 });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch favorites" }), { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    try {
        const { resourceId } = await req.json();
        if (!resourceId) {
            return new Response(JSON.stringify({ error: "Resource ID is required" }), { status: 400 });
        }
        // Check if the favorite already exists, this is not fully tested... but should work  //Christian      
        const existingFavorites = await getFavoriteResourcesByUserId(session.user.id);
        if (existingFavorites.some(fav => fav.id === resourceId)) {
            deleteFavorite(session.user.id, resourceId);
            return new Response(JSON.stringify({ message: "Favorite removed" }), { status: 200 });
        }
        const newFavorite = await createFavorite(session.user.id, resourceId);
        return new Response(JSON.stringify(newFavorite), { status: 201 });
    }
    catch (error) {
        console.error("Error creating favorite:", error);
        return new Response(JSON.stringify({ error: "Failed to create favorite" }), { status: 500 });
    }
}