"use client";

import { useParams } from "next/navigation";
import useBookingQuery from "../hooks/use-booking-query";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import { Booking } from "../types/booking";
import { Resource } from "@/features/resource/types/resource";
import ResourceBookingCard from "@/features/resource/components/booking-section/resource-booking-card";

export default function BookingModifyScreen() {
    const { booking_id } = useParams();
    const { data: bookings, isLoading: bLoading } = useBookingQuery();
    const { data: resources, isLoading: rLoading } = useResourcesQuery();

    if (bLoading || rLoading) return <div>Loading booking details...</div>;

    const currentBooking = bookings?.find((b: Booking) => b.id === booking_id);

    const resource = resources?.find((r: Resource) =>
        r.id === currentBooking?.resourceId
    );

    if (!currentBooking || !resource) return <div>Booking not found.</div>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            <h1 className="text-3xl font-black mb-8 text-slate-900">
                Modify your {resource.name} Reservation
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Side: Summary of what they are changing */}
                <div className="space-y-4">
                    <p className="text-slate-500">
                        You are currently scheduled for:
                        <span className="block font-bold text-slate-900">
                            {new Date(currentBooking.startTime)
                                .toLocaleString()}
                        </span>
                    </p>
                </div>

                {/* Right Side: Re-use your Booking Card */}
                <ResourceBookingCard
                    resource={resource}
                    expanded={true}
                    initialDate={{
                        from: new Date(currentBooking.startTime),
                        to: new Date(currentBooking.endTime),
                    }}
                    mode="edit" // Pass a mode so the card knows to UPDATE instead of CREATE
                    bookingId={currentBooking.id}
                />
            </div>
        </div>
    );
}
