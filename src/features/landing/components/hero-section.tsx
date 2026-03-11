"use client";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative w-full h-[700px] overflow-hidden">
            <Image
                src="/assets/hero.png"
                alt="Hero"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="relative h-full flex flex-col items-start justify-center px-10 mx-auto gap-6 z-20">
                <div className="text-5xl md:text-7xl font-bold text-white max-w-4xl leading-tight">
                    Find and Book Shared <br /> Resources Easily
                </div>
                <div className="text-xl md:text-2xl max-w-xl text-white/80">
                    Discover and reserve apartments, vehicles, and more with
                    ease.
                </div>
                <Button
                    asChild
                    className={cn(
                        "h-14 text-xl md:text-2xl px-10 rounded-full",
                        "w-full sm:w-fit min-w-[200px]",
                        "hover:bg-[#1181c4]",
                        "transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
                        "cursor-pointer",
                    )}
                >
                    <Link href="/login">Get Started</Link>
                </Button>
            </div>
        </div>
    );
}
