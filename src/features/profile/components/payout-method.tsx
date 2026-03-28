"use client";

import { Landmark } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

export default function PayoutMethod() {
    return (
        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4 shadow-xl relative overflow-hidden group">
            {/* Subtle background decoration to make it look like a credit card */}
            <div className="absolute -right-4 -top-4 size-24 bg-white/5 rounded-full transition-transform group-hover:scale-150 duration-700" />

            <div className="flex justify-between items-start relative z-10">
                <Landmark className="text-gb-blue size-8" />
                <Badge className="bg-white/10 text-white border-none text-[10px] font-bold">
                    PRIMARY
                </Badge>
            </div>

            <div className="relative z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Bank Account
                </p>
                <h4 className="font-bold text-lg tracking-widest">•••• 8829</h4>
                <p className="text-xs text-slate-500 font-medium">
                    JP Morgan Chase
                </p>
            </div>

            <Button
                variant="ghost"
                className="w-full text-xs text-slate-400 hover:text-white p-0 h-auto justify-start hover:bg-transparent transition-colors"
            >
                Edit payout method
            </Button>
        </div>
    );
}