"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, CreditCard, Loader2, Lock } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface CheckoutProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    amount: number;
}

export default function BookingCheckoutOverlay({ isOpen, onConfirm, onCancel, amount }: CheckoutProps) {
    const [step, setStep] = useState<"details" | "processing" | "success">("details");

    useEffect(() => {
        if (!isOpen) setStep("details");
    }, [isOpen]);

    const handlePayment = () => {
        setStep("processing");
        // Simulate network delay for payment authorization
        setTimeout(() => {
            setStep("success");
            // Wait a bit on success screen before final redirect/mutate
            setTimeout(() => {
                onConfirm();
            }, 1500);
        }, 2500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden p-8 space-y-6">
                
                {step === "details" && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-black text-slate-900">Checkout</h2>
                            <p className="text-slate-500 font-medium">Finalize your booking securely</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-bold uppercase tracking-wider">Total Amount</span>
                                <span className="text-xl font-black text-gb-blue">${amount.toFixed(2)}</span>
                            </div>
                            <div className="h-px bg-slate-200 w-full" />
                            <div className="flex items-center gap-4 text-slate-600">
                                <div className="size-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Visa Ending in 8829</p>
                                    <p className="text-[10px] uppercase font-black text-slate-400">Default Payout Method</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button 
                                onClick={handlePayment}
                                className="h-14 bg-gb-blue hover:bg-gb-blue/90 text-white rounded-2xl font-black text-lg shadow-lg shadow-gb-blue/20"
                            >
                                Pay & Confirm Booking
                            </Button>
                            <Button variant="ghost" onClick={onCancel} className="text-slate-400 font-bold hover:bg-transparent">
                                Cancel
                            </Button>
                        </div>
                        <p className="text-[10px] text-center text-slate-400 font-bold uppercase flex items-center justify-center gap-1">
                            <Lock size={10} /> Simulated Sandbox Transaction
                        </p>
                    </div>
                )}

                {step === "processing" && (
                    <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in zoom-in-95">
                        <Loader2 className="size-16 text-gb-blue animate-spin" />
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-black text-slate-900">Authorizing...</h3>
                            <p className="text-sm text-slate-500 font-medium px-8 text-center">
                                Please do not refresh. Verifying simulated funds with your bank.
                            </p>
                        </div>
                    </div>
                )}

                {step === "success" && (
                    <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in zoom-in-95">
                        <div className="size-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={48} />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-black text-slate-900">Payment Successful!</h3>
                            <p className="text-sm text-slate-500 font-medium">Your resource is now reserved.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}