"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
    category: {
        label: string;
        slug: string;
        icon: LucideIcon;
        image: string;
    };
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const Icon = category.icon;

    return (
        <Link
            href={`/resources?category=${encodeURIComponent(category.label)}`}
            className="group relative h-48 rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
        >
            {/* Background Image with Overlay */}
            <img
                src={category.image}
                alt={category.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="size-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3 group-hover:bg-gb-blue group-hover:scale-110 transition-all duration-500">
                    <Icon size={20} />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                    {category.label}
                </h3>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Browse Collection
                </p>
            </div>
        </Link>
    );
}
