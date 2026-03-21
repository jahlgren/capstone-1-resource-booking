import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Booking, UpdateBookingPayload } from "../types/booking";
import toast from "react-hot-toast";

async function handleUpdateBooking (payload: UpdateBookingPayload) {
    const res = await fetch("/api/booking", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update booking");
    }
    return res.json();
}

export default function useBookingUpdateQuery() {
    const queryClient = useQueryClient();

    return useMutation<
        Booking,
        Error,
        UpdateBookingPayload,
        { toastid: string }
    >({
        mutationFn: handleUpdateBooking,
        retry: false,
        onMutate: () => {
            const toastId = toast.loading("Processing your update...");
            return { toastid: toastId };
        },
        onSuccess: (_data, _variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            toast.success("Booking updated!", {
                id: context.toastid,
                duration: 3000,
            });
        },
        onError: (err, _variables, context) => {
            toast.error(
                (
                    <div>
                        <strong className="font-medium">
                            Update failed
                        </strong>
                        <p className="text-sm">{err.message}</p>
                    </div>
                ),
                {
                    id: context?.toastid,
                    duration: 4000,
                },
            );
        },
    })
}