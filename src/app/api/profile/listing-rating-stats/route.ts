import { auth } from "@/features/auth/server/auth-server";
import { headers } from "next/headers";
import { getHostListingRatingStats } from "@/features/rating/server/get-host-listing-rating-stats";

export async function GET() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const stats = await getHostListingRatingStats(session.user.id);
        return Response.json(stats, { status: 200 });
    } catch (error) {
        console.error("listing-rating-stats:", error);
        return Response.json(
            { message: "Failed to load rating stats" },
            { status: 500 },
        );
    }
}
