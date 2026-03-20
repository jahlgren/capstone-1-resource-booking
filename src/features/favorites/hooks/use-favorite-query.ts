import { useQuery } from "@tanstack/react-query";
import { Favorites } from "../types/favorites";

async function fetchFavorites(): Promise<Favorites[]> {
    const res = await fetch("/api/resource/favorites");
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch favorites");
    }
    return res.json();
}

export default function useFavoritesQuery() {
    return useQuery<Favorites[], Error>({
        queryKey: ["favorites"],
        queryFn: fetchFavorites,
        retry: false,
    });
}