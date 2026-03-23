"use client";
import { Heart } from "lucide-react";
import { HeaderSectionProps } from "../types/favorites";

export default function HeaderSection({ count }: HeaderSectionProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-gb-blue font-bold uppercase tracking-widest text-xs">
                <Heart className="size-4 fill-gb-blue" />
                <span>Personal Collection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Saved Favorites
            </h1>
            <p className="text-slate-500 font-medium text-lg">
                You have{" "}
                <span className="text-slate-900 font-bold">{count}</span>{" "}
                {count === 1 ? "item" : "items"} ready to book.
            </p>
        </div>
    );
}
