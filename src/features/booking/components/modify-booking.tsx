"use client";

import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function ModifyBooking ({ bookingId }: { bookingId: string }) {
    const router = useRouter();

    return(
        <DropdownMenuItem
            onClick={() => router.push(`/bookings/modify/${bookingId}`)}
        >
            Modify booking
        </DropdownMenuItem>
    );
}