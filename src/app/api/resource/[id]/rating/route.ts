import { createRating } from "@/features/rating/server/create-rating";
import { getResourceRatings } from "@/features/rating/server/get-ratings";
import { createRatingSchema } from "@/features/rating/validation/create-rating-validator";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const ratings = await getResourceRatings(id);
        return new Response(JSON.stringify(ratings), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Could not fetch ratings" }),
            { status: 500 }
        );
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const body = await req.json();

        const validatedData = createRatingSchema.parse({
            ...body,
            resourceId: id,
        });

        const newRating = await createRating(validatedData);

        return new Response(JSON.stringify(newRating), { status: 201 });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: error instanceof Error ? error.message : "Invalid data" }),
            { status: 400 }
        );
    }
}