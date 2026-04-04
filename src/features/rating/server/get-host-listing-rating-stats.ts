import db from "@/db";
import { rating } from "../model/rating";
import { resource } from "@/features/resource/model/resource";
import { eq, sql } from "drizzle-orm";

/** Average star rating across every review on resources owned by `hostUserId`. */
export async function getHostListingRatingStats(hostUserId: string) {
    const [row] = await db
        .select({
            avgRating: sql<string | null>`(round(avg(${rating.stars})::numeric, 1))::text`,
            totalReviews: sql<number>`count(${rating.id})::int`,
        })
        .from(rating)
        .innerJoin(resource, eq(rating.resourceId, resource.id))
        .where(eq(resource.userId, hostUserId));

    const totalReviews = Number(row?.totalReviews ?? 0);

    return {
        avgRating: totalReviews > 0 ? row?.avgRating ?? null : null,
        totalReviews,
    };
}
