"use client";

import { ExternalLink, LifeBuoy } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function SupportCard() {
    const handleContactSupport = () => {
        // You could open a mailto link, a chat widget, or a dedicated support page
        window.location.href = "mailto:support@orderease.com";
    };

    return (
        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5 transition-all hover:shadow-md">
            {/* Icon Header */}
            <div className="size-12 bg-gb-blue/10 rounded-2xl flex items-center justify-center">
                <LifeBuoy className="text-gb-blue size-6 animate-pulse" />
            </div>

            {/* Text Content */}
            <div className="space-y-2">
                <h4 className="font-black text-slate-900 text-lg leading-tight">
                    Need help?
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    Our support team is available 24/7 to help you with your
                    listings, payouts, or active bookings.
                </p>
            </div>

            {/* Action Button */}
            <Button
                onClick={handleContactSupport}
                className="w-full bg-slate-900 hover:bg-gb-blue text-white rounded-xl font-bold h-12 flex items-center justify-center gap-2 transition-all group"
            >
                Contact Support
                <ExternalLink
                    size={14}
                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                />
            </Button>

            {/* Optional: Quick Links */}
            <div className="pt-2 flex flex-col gap-2">
                <button className="text-[10px] text-left font-black uppercase tracking-widest text-slate-400 hover:text-gb-blue transition-colors">
                    View FAQ
                </button>
                <button className="text-[10px] text-left font-black uppercase tracking-widest text-slate-400 hover:text-gb-blue transition-colors">
                    Safety Guidelines
                </button>
            </div>
        </div>
    );
}
