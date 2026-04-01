"use client";
import { Card, CardContent } from "@/shared/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { Presentation, Van, Warehouse, Wrench } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";

const features = [
    {
        icon: <Warehouse className="size-8" />,
        iconColor: "text-[#63BE57]",
        title: "Apartments & Spaces",
    },
    {
        icon: <Van className="size-8" />,
        iconColor: "text-[#1980D5]",
        title: "Vehicles & Transport",
    },
    {
        icon: <Wrench className="size-8" />,
        iconColor: "text-[#63BE57]",
        title: "Tools & Equipment",
    },
    {
        icon: <Presentation className="size-8" />,
        iconColor: "text-[#1980D5]",
        title: "Office & Tech",
    },
];

export default function FeaturedCategories() {
    return (
        <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-12 md:px-16">
                <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-12 text-center">
                    Available Resources
                </h2>
                <Carousel
                    className="w-full"
                    plugins={[
                        Autoplay({
                            delay: 3000,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-4">
                        {features.map((feature, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className="h-full"
                                >
                                    <Card className="group relative p-[2px] overflow-hidden rounded-[calc(2.5rem-2px)] hover:shadow-md transition-shadow duration-300 bg-white">
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#1980D5] to-[#63BE57] opacity-100 group-hover:opacity-50 transition-opacity duration-500" />
                                        <CardContent className="relative flex flex-col gap-3 aspect-square sm:aspect-video items-center justify-center p-6 bg-white rounded-[calc(1.5rem-2px)] h-full w-full">
                                            <div
                                                className={cn(
                                                    "bg-slate-50 p-4 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110",
                                                    feature.iconColor,
                                                )}
                                            >
                                                {feature.icon}
                                            </div>
                                            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 text-center leading-tight">
                                                {feature.title}
                                            </span>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12" />
                    <CarouselNext className="hidden md:flex -right-12" />
                </Carousel>
            </div>
        </section>
    );
}
