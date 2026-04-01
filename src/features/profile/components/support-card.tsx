"use client";

import { ExternalLink, LifeBuoy, ShieldCheck, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function SupportCard() {
    return (
        <div className="h-full p-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
            <div className="space-y-5">
                {/* Header */}
                <div className="space-y-5">
                    <div className="size-12 bg-gb-blue/10 rounded-2xl flex items-center justify-center text-gb-blue">
                        <LifeBuoy size={24} className="animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-black text-slate-900 text-xl leading-tight">Support Center</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            Need help with a booking or payout? Our team is standing by.
                        </p>
                    </div>
                </div>

                {/* Simulated Trust/Status Section (Adds Height & Value) */}
                <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="text-emerald-500 size-5" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-700">Account Status</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                        Your account is in good standing. Verification level: <span className="text-emerald-600 font-bold uppercase">Pro</span>
                    </p>
                </div>

                {/* Helpful Resources (Adds more vertical weight) */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Resources</p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 group cursor-pointer">
                            <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-gb-blue group-hover:text-white transition-colors">
                                <BookOpen size={16} />
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Documentation</span>
                        </li>
                        <li className="flex items-center gap-3 group cursor-pointer">
                            <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                <MessageSquare size={16} />
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Community Forum</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 space-y-4">
                <Button
                    asChild
                    className="w-full bg-slate-900 hover:bg-gb-blue text-white rounded-2xl font-black h-14 flex items-center justify-center gap-2 transition-all group shadow-lg shadow-slate-200"
                >
                    <a target="_blank" href="https://github.com/jahlgren/capstone-1-resource-booking/issues">
                        Contact Support
                        <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                </Button>
                
                <div className="flex justify-between px-2">
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-gb-blue transition-colors">FAQ</button>
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-gb-blue transition-colors">Safety</button>
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-gb-blue transition-colors">Terms</button>
                </div>
            </div>
        </div>
    );
}