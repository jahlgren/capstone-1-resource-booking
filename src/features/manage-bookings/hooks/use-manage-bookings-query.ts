import { useQuery } from "@tanstack/react-query";
import { ManageBookingRequest } from "../types/manage-bookings";

async function getBookingsRequests() {
    const res = await fetch("/api/manage-bookings");
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch booking requests");
    }
    return res.json();
}

export default function useManageBookingsQuery() {
    return useQuery<ManageBookingRequest[]>({
        queryKey: ["manage-bookings"],
        queryFn: getBookingsRequests,
        retry: false,
    });
}