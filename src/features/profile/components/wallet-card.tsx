"use client";

import { ArrowUpRight, Wallet } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { calculateBookingTotal } from "@/shared/lib/booking-utils";
import { WalletCardProps } from "../types/profile";
import toast from "react-hot-toast";
import { useState } from "react";

export default function WalletCard({ historyRequests }: WalletCardProps) {
    const [hasWithdrawn, sethasWithdrawn] = useState<boolean>(false);

    const allRequests =
        historyRequests.filter((r: any) => r.status !== "pending") || [];
    const pendingRequest =
        historyRequests.filter((r: any) => r.status === "pending") || [];

    const availableBalance = allRequests.filter((req) =>
        req.status === "confirmed"
    )
        .reduce((acc, req) => {
            const { subtotal } = calculateBookingTotal(
                new Date(req.startTime),
                new Date(req.endTime),
                { price: req.price, priceUnit: req.priceUnit } as any,
            );
            return acc + subtotal;
        }, 0);

    const pendingBalance = pendingRequest.reduce((acc, req) => {
            const { subtotal } = calculateBookingTotal(
                new Date(req.startTime),
                new Date(req.endTime),
                { price: req.price, priceUnit: req.priceUnit } as any,
            );
            return acc + subtotal;
        }, 0);

    const displayBalance = hasWithdrawn ? 0 : availableBalance;

    const handleWithdraw = () => {
        if (displayBalance <= 0) {
            toast.error("No funds available to withdraw!");
            return;
        }

        const promise = new Promise((resolve) => {
            setTimeout(() => resolve(true), 2000);
        });
        toast.promise(promise, {
            loading: "Processing your withdrawing...",
            success: () => {
                sethasWithdrawn(true);
                return "Funds transferred to your bank account!";
            },
            error: "Transfer failed.",
        });
    };

    return (
        <div className="lg:col-span-2 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 transition-all hover:border-slate-200">
            <div className="flex items-center gap-6">
                <div className="size-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Wallet size={32} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                        Available for Payout
                    </p>
                    <h3 className="text-4xl font-black text-slate-900 leading-none">
                        ${displayBalance.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}
                    </h3>
                    {!hasWithdrawn && (
                        <p className="text-xs font-medium text-slate-400 mt-2">
                            +${pendingBalance.toFixed(2)} currently pending
                        </p>
                    )}
                </div>
            </div>

            <Button
                onClick={handleWithdraw}
                disabled={hasWithdrawn || displayBalance === 0}
                className="bg-gb-blue hover:bg-blue-600 text-white rounded-2xl px-8 h-14 font-bold shadow-lg shadow-blue-100 flex gap-2 transition-all hover:scale-105 active:scale-95"
            >
                {hasWithdrawn ? "Funds Withdrawn" : "Withdraw Funds"} <ArrowUpRight size={18} />
            </Button>
        </div>
    );
}
