"use client";

import WalletCard from "./wallet-card";
import PayoutMethod from "./payout-method";
import { FinanceSectionProps } from "../types/profile";

export default function FinanceSection({ historyRequests = [] }: FinanceSectionProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">
                Earnings & Payouts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <WalletCard historyRequests={historyRequests}/>
                <PayoutMethod />
            </div>
        </div>
    );
}