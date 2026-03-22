"use client";
import { Button } from "@/shared/components/ui/button";
import { BookingSubmitButtonProps } from "../../types/resource";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";

export default function BookingSubmitButton({
    onClick,
    isLoading,
    disabled,
    isRangeInvalid,
    handleReset,
    mode = "create",
}: BookingSubmitButtonProps & { mode?: "create" | "edit" }) {
    const router = useRouter();

    // Reusable Button UI
    const TriggerButton = (
        <Button
            disabled={disabled || isLoading}
            className={cn(
                "w-full h-14 text-lg font-bold rounded-2xl transition-all duration-300",
                isRangeInvalid
                    ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                    : "bg-[#1980D5] hover:bg-[#1980D5]/90 text-white shadow-lg active:scale-95",
            )}
        >
            {isLoading
                ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {mode === "edit" ? "Updating..." : "Processing..."}
                    </span>
                )
                : isRangeInvalid
                ? (
                    "Dates Unavailable"
                )
                : mode === "edit"
                ? (
                    "Save Changes"
                )
                : (
                    "Book Now"
                )}
        </Button>
    );

    return (
        <div className="w-full space-y-4">
            {/* Logic: If invalid/disabled, show button only. If valid, wrap in AlertDialog. */}
            {isRangeInvalid || disabled ? TriggerButton : (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        {TriggerButton}
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-[2.5rem] bg-white border-none shadow-2xl p-8">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black text-slate-900">
                                {mode === "edit"
                                    ? "Confirm Changes?"
                                    : "Confirm Booking?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-500 font-medium text-base">
                                {mode === "edit"
                                    ? "Are you sure you want to update your reservation? This will modify your current dates and total price."
                                    : "You are about to book this resource. By confirming, you agree to our terms and the calculated service fees."}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-8 gap-3">
                            <AlertDialogCancel className="!rounded-full border-none font-bold text-slate-400 hover:bg-slate-50 h-12">
                                Wait, go back
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={onClick}
                                className="!rounded-full bg-gb-blue hover:bg-gb-blue/90 font-bold px-10 h-12 shadow-lg shadow-gb-blue/20"
                            >
                                {mode === "edit"
                                    ? "Yes, Update"
                                    : "Yes, Book it"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

            {/* Edit Mode Helpers */}
            {mode === "edit" && (
                <div className="flex items-center justify-center gap-4 py-2">
                    <Button
                        variant="ghost"
                        className="text-slate-400 hover:text-slate-600 font-bold h-auto p-0 text-sm"
                        onClick={() => router.push("/bookings")}
                    >
                        Discard Changes
                    </Button>
                    <div className="w-px h-3 bg-slate-200" />
                    <Button
                        variant="ghost"
                        className="text-gb-blue hover:bg-transparent font-bold h-auto p-0 text-sm"
                        onClick={handleReset}
                    >
                        Reset Dates
                    </Button>
                </div>
            )}

            {!disabled && !isRangeInvalid && (
                <p className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {mode === "edit"
                        ? "Updates handled securely via OrderEase"
                        : "Secure payment & booking via OrderEase"}
                </p>
            )}
        </div>
    );
}
