"use client";

import { useParams } from "next/navigation";
import useBookingQuery from "../hooks/use-booking-query";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import { Booking } from "../types/booking";
import { Resource } from "@/features/resource/types/resource";
import ResourceBookingCard from "@/features/resource/components/booking-section/resource-booking-card";
import BookingBreadcrumb from "../components/booking-breadcrubm";
import { format } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import { Card } from "@/shared/components/ui/card";

export default function BookingModifyScreen() {
    const { booking_id } = useParams();
    const { data: bookings, isLoading: bLoading } = useBookingQuery();
    const { data: resources, isLoading: rLoading } = useResourcesQuery();

    if (bLoading || rLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
                <div className="animate-pulse font-bold text-slate-400">
                    Loading details...
                </div>
            </div>
        );
    }

    const currentBooking = bookings?.find((b: Booking) => b.id === booking_id);
    const resource = resources?.find((r: Resource) =>
        r.id === currentBooking?.resourceId
    );

    if (!currentBooking || !resource) {
        return <div className="p-20 text-center">Booking not found.</div>;
    }

    const start = new Date(currentBooking.startTime);
    const end = new Date(currentBooking.endTime);

    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="max-w-5xl mx-auto px-6 space-y-8">
                {/* Header & Breadcrumb */}
                <div className="space-y-2">
                    <BookingBreadcrumb resource={resource} />
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Modify Reservation
                    </h1>
                    <p className="text-slate-500 font-medium text-lg">
                        Updating your booking for{" "}
                        <span className="text-gb-blue">{resource.name}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* Left Side: Current Booking Info (Takes 2 columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-8 rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-md">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
                                        <CalendarDays className="size-5" />
                                    </div>
                                    <h3 className="font-bold text-slate-900">
                                        Original Schedule
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                            Date Range
                                        </span>
                                        <p className="text-xl font-black text-slate-800">
                                            {format(start, "MMM dd")} —{" "}
                                            {format(end, "MMM dd, yyyy")}
                                        </p>
                                    </div>

                                    {resource.priceUnit === "hour" && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                                Time Slot
                                            </span>
                                            <div className="flex items-center gap-2 text-gb-blue font-bold">
                                                <Clock className="size-4" />
                                                <span>
                                                    {format(start, "HH:mm")} -
                                                    {" "}
                                                    {format(end, "HH:mm")}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Educational Note or Tip */}
                        <div className="px-8 py-4 bg-gb-blue/5 rounded-3xl border border-gb-blue/10">
                            <p className="text-xs text-gb-blue/80 leading-relaxed font-medium">
                                <strong>Note:</strong>{" "}
                                Your original spot is held until you confirm
                                changes. If you select new dates, they will be
                                validated for availability.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Re-use your Booking Card (Takes 3 columns) */}
                    <div className="lg:col-span-3">
                        <ResourceBookingCard
                            resource={resource}
                            expanded={true}
                            initialDate={{ from: start, to: end }}
                            mode="edit"
                            bookingId={currentBooking.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
