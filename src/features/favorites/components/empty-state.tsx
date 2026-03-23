"use client";
import { ArrowRight, Bookmark } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyState() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center py-32 px-6 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="size-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                <Bookmark className="size-10" />
            </div>
            <div className="space-y-2 max-w-sm">
                <h2 className="text-2xl font-black text-slate-900">
                    Your list is empty
                </h2>
                <p className="text-slate-500 font-medium">
                    Save the resources you use most frequently to find them here
                    easily.
                </p>
            </div>
            <Button
                onClick={() => router.push("/resources")}
                className="rounded-full bg-gb-blue hover:bg-gb-blue/90 font-bold h-12 px-8 shadow-lg shadow-gb-blue/10 transition-all hover:scale-105 active:scale-95"
            >
                Explore Resources <ArrowRight className="ml-2 size-4" />
            </Button>
        </div>
    );
}
