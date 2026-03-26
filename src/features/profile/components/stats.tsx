"use client";
import { Booking } from "@/features/booking/types/booking";
import { Resource } from "@/features/resource/types/resource";
import { Card } from "@/shared/components/ui/card";
import { CalendarCheck, Package, Star } from "lucide-react";

export default function Stats({ resources, bookings }: { resources: Resource[], bookings: Booking[] }) {
    const listingsCount = resources?.length.toString();
    const bookingsCount = bookings?.length.toString();

    const stats = [
        {
            label: "My Listings",
            value: listingsCount,
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            label: "Total Bookings",
            value: bookingsCount,
            icon: CalendarCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            label: "Trust Rating",
            value: "4.9",
            icon: Star,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
                <Card
                    key={stat.label}
                    className="p-8 rounded-[2.5rem] bg-white border-none shadow-sm flex flex-col items-start gap-4 hover:shadow-md transition-shadow"
                >
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="size-6" />
                    </div>
                    <div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            {stat.label}
                        </p>
                        <p className="text-4xl font-black text-slate-900">
                            {stat.value}
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    );
}
