import { Resource } from "@/features/resource/types/resource";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type ManageBookingRequest = {
    id: string;
    status: BookingStatus;
    startTime: string | Date;
    endTime: string | Date;
    createdAt: string | Date;
    resourceId: string;
    renterId: string;
    resourceName: string;
    resourceImage: string | null;
    price: number;
    priceUnit: Resource["priceUnit"];
    renterName: string;
    renterImage: string | null;
};

export type updateBookingsRequestPayload = {
    id: string;
    status: BookingStatus;
}

export type RevenueSummaryProps = {
    historyRequests: ManageBookingRequest[];
}