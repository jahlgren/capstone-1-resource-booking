import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateRating, Rating } from "../types/rating";
import toast from "react-hot-toast";

async function handleCreateResourceRating (payload: CreateRating) {
    const res = await fetch(`/api/resource/${payload.resourceId}/rating`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to rate resource");
    }

    return res.json();
}

export default function useRatingCreateQuery () {
    const queryClient = useQueryClient();

    return useMutation<
        Rating,
        Error,
        CreateRating,
        { toastid: string }
    >({
        mutationFn: async (payload) => await handleCreateResourceRating(payload),
        retry: false,
        onMutate: () => {
            const toastid = toast.loading("Creating resource...");
            return { toastid };
        },
        onSuccess: (_data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["resources"] });
            queryClient.invalidateQueries({
                queryKey: ["resource-ratings", variables.resourceId],
            });
            queryClient.invalidateQueries({
                queryKey: ["profile", "listing-rating-stats"],
            });
            toast.success("Resource rated", {
                id: context.toastid,
                duration: 2000,
            });
        },
        onError: (err, _, context) => {
            toast.error(
                (
                    <div>
                        <strong className="font-medium">Rating resource failed</strong>
                        <p className="text-sm">{err.message}</p>
                    </div>
                ),
                {
                    id: context?.toastid,
                    duration: 3000,
                },
            );
        },
    })
}