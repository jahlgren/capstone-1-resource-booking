"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/components/ui/avatar";
import { Rating, ReviewCardProps } from "../types/rating";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";

function displayName(review: Rating) {
    if (review.reviewerName?.trim()) return review.reviewerName.trim();
    return "Guest";
}

function initials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "GU";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ReviewCard({ review, className }: ReviewCardProps) {
    const name = displayName(review);
    const created = review.createdAt
        ? new Date(review.createdAt)
        : null;

    return (
        <article
            className={cn(
                "rounded-[1.75rem] border border-slate-100 bg-white p-5 md:p-6 shadow-sm",
                "transition-shadow duration-300 hover:shadow-md hover:border-slate-200/80",
                className,
            )}
        >
            <div className="flex gap-4">
                <Avatar className="size-12 shrink-0 border-2 border-slate-50 shadow-sm">
                    <AvatarImage src={review.reviewerImage ?? ""} alt="" />
                    <AvatarFallback className="bg-gb-blue/10 text-gb-blue text-sm font-black">
                        {initials(name)}
                    </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2 gap-y-1">
                        <div>
                            <p className="font-bold text-slate-900 leading-tight">
                                {name}
                            </p>
                            {created && !Number.isNaN(created.getTime())
                                ? (
                                    <time
                                        dateTime={created.toISOString()}
                                        className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
                                    >
                                        {format(created, "MMM d, yyyy")}
                                    </time>
                                )
                                : null}
                        </div>
                        <div
                            className="flex items-center gap-0.5 shrink-0"
                            aria-label={`${review.stars} out of 5 stars`}
                        >
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "size-4",
                                        i < review.stars
                                            ? "fill-amber-400 text-amber-400"
                                            : "fill-slate-100 text-slate-200",
                                    )}
                                    strokeWidth={i < review.stars ? 0 : 1.5}
                                />
                            ))}
                        </div>
                    </div>
                    {review.comment
                        ? (
                            <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed font-medium">
                                {review.comment}
                            </p>
                        )
                        : (
                            <p className="text-sm italic text-slate-400 font-medium">
                                No written comment
                            </p>
                        )}
                </div>
            </div>
        </article>
    );
}
