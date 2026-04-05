"use client";

import useResourceRatingsQuery from "@/features/rating/hooks/use-rating-query";
import ReviewCard from "@/features/rating/components/review-card";
import { MessageSquareQuote } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type ResourceReviewsSectionProps = {
    resourceId: string;
    className?: string;
};

export default function ResourceReviewsSection(
    { resourceId, className }: ResourceReviewsSectionProps,
) {
    const { data: reviews, isPending, isError } = useResourceRatingsQuery(
        resourceId,
    );

    return (
        <section
            className={cn("space-y-5", className)}
            aria-labelledby="resource-reviews-heading"
        >
            <div className="flex items-center gap-2 text-slate-400">
                <MessageSquareQuote className="size-4 text-gb-blue" />
                <h2
                    id="resource-reviews-heading"
                    className="text-xs font-black uppercase tracking-widest"
                >
                    Guest reviews
                </h2>
                {reviews && reviews.length > 0
                    ? (
                        <span className="text-[11px] font-bold text-slate-400 tabular-nums">
                            ({reviews.length})
                        </span>
                    )
                    : null}
            </div>

            {isPending
                ? (
                    <div className="space-y-4">
                        {[0, 1, 2].map((k) => (
                            <div
                                key={k}
                                className="rounded-[1.75rem] border border-slate-100 bg-white p-6 animate-pulse"
                            >
                                <div className="flex gap-4">
                                    <div className="size-12 rounded-full bg-slate-100 shrink-0" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 w-36 rounded-lg bg-slate-100" />
                                        <div className="h-3 w-24 rounded-lg bg-slate-50" />
                                        <div className="h-12 w-full rounded-xl bg-slate-50" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                : isError
                ? (
                    <p className="text-sm font-medium text-slate-500 rounded-3xl border border-dashed border-slate-200 bg-white/80 px-6 py-8 text-center">
                        Could not load reviews. Try again later.
                    </p>
                )
                : !reviews?.length
                ? (
                    <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/60 px-6 py-12 text-center space-y-2">
                        <p className="text-lg font-black text-slate-800">
                            No reviews yet
                        </p>
                        <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
                            Be the first to book and share your experience.
                        </p>
                    </div>
                )
                : (
                    <ul className="space-y-4 list-none p-0 m-0">
                        {reviews.map((review) => (
                            <li key={review.id}>
                                <ReviewCard review={review} />
                            </li>
                        ))}
                    </ul>
                )}
        </section>
    );
}
