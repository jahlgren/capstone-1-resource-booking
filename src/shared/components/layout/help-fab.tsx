"use client";

import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

export default function HelpFab() {
    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/about"
                        className="flex size-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-2xl border border-slate-100 hover:bg-gb-blue hover:text-white hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                    >
                        <HelpCircle
                            size={24}
                            className="group-hover:rotate-12 transition-transform"
                        />
                    </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-white border-none font-bold text-xs">
                    Help & Project Info
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
