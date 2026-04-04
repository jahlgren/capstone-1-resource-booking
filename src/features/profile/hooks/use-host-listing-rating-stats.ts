import { useQuery } from "@tanstack/react-query";

export type HostListingRatingStats = {
    avgRating: string | null;
    totalReviews: number;
};

async function fetchHostListingRatingStats(): Promise<HostListingRatingStats> {
    const res = await fetch("/api/profile/listing-rating-stats");
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
            (err as { message?: string }).message ||
                "Failed to fetch listing rating stats",
        );
    }
    return res.json();
}

export default function useHostListingRatingStats() {
    return useQuery({
        queryKey: ["profile", "listing-rating-stats"],
        queryFn: fetchHostListingRatingStats,
        retry: false,
    });
}
