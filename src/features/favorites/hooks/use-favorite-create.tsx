import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateFavoriteInput, Favorites } from "../types/favorites";
import { Favorites as FavoritesTypes } from "../types/favorites";
import toast from "react-hot-toast";


async function handleCreateFavorite(input: CreateFavoriteInput): Promise<FavoritesTypes> {
    const res = await fetch("/api/resource/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create favorite");
    }
    return res.json();
}

export default function useCreateFavoriteMutation() {
    const queryClient = useQueryClient();
    return useMutation<FavoritesTypes, Error, CreateFavoriteInput, { toastId: string }>({
        mutationFn: async (input) => await handleCreateFavorite(input),
        retry: false,
        onMutate: ()=> {
            const toastId = toast.loading("Adding to favorites...");
            return { toastId };
        },
         onError: (err, _, context) => {
            toast.error((
                <div>
                    <strong className="font-medium">Failed to add favorite</strong>
                    <p>{err.message}</p>
                </div>
            ), {
                id: context?.toastId,
                duration: 3000
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
            toast.success("Added favorites success", {
                duration: 2000
            });
        },
    });
}