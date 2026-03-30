"use client";

import Link from "next/link";
import { Calendar, ChevronRight, Inbox, Wallet } from "lucide-react";
import { ActivitySnippet } from "../types/home";

export default function ActivityBanner(
    { snippets }: { snippets: ActivitySnippet[] },
) {
    const icons = {
        inbox: Inbox,
        calendar: Calendar,
        wallet: Wallet,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {snippets.map((snippet) => {
                const Icon = icons[snippet.icon];
                return (
                    <Link
                        key={snippet.id}
                        href={snippet.href}
                        className="group bg-white border border-slate-100 p-6 rounded-[2rem] flex items-center justify-between hover:shadow-xl hover:border-gb-blue/20 transition-all duration-500"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`size-12 rounded-2xl flex items-center justify-center ${snippet.color}`}
                            >
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    {snippet.label}
                                </p>
                                <h4 className="text-xl font-black text-slate-900">
                                    {snippet.count} active
                                </h4>
                            </div>
                        </div>
                        <div className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-gb-blue group-hover:text-white transition-all">
                            <ChevronRight size={18} />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
