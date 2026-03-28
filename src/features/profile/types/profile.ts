import { Session } from "@/features/auth/types/session";
import { ManageBookingRequest } from "@/features/manage-bookings/types/manage-bookings";

export type ProfileProps = {
    user: NonNullable<Session["user"]>;
}

export type FinanceSectionProps = {
    historyRequests?: ManageBookingRequest[]
}

export type WalletCardProps = {
    historyRequests: ManageBookingRequest[];
}