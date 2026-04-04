import { useQuery } from "@tanstack/react-query";
import { Rating } from "../types/rating";

async function fetchResourceRatings(resourceId: string): Promise<Rating[]> {
    const res = await fetch(`/api/resource/${resourceId}/rating`);
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
            (errorData as { message?: string }).message ||
                "Failed to fetch ratings",
        );
    }
    return res.json();
}

/** Ratings for a resource (deduped per resourceId by React Query). */
export default function useResourceRatingsQuery(resourceId: string | undefined) {
    return useQuery({
        queryKey: ["resource-ratings", resourceId],
        queryFn: () => fetchResourceRatings(resourceId!),
        enabled: !!resourceId,
        retry: false,
    });
}