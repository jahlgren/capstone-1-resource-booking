"use client";

import HeaderSection from "../components/header-section";
import Stats from "../components/stats";
import DetailsForm from "../components/details-form";
import { Button } from "@/shared/components/ui/button";
import { LifeBuoy } from "lucide-react";
import { ProfileProps } from "../types/profile";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import useBookingQuery from "@/features/booking/hooks/use-booking-query";

export default function ProfileScreen({ user }: ProfileProps) {
    const { data: resources } = useResourcesQuery();
    const { data: bookings } = useBookingQuery();

    return (
        <div className="flex-1 min-h-screen bg-slate-50/50 py-12 px-6 md:px-10">
            <div className="max-w-5xl mx-auto flex flex-col gap-5">
                <HeaderSection user={user} />

                {/* 2. Data Aggregation Section */}
                <div className="space-y-6">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">
                        Overview
                    </h2>
                    <Stats resources={resources} bookings={bookings} />
                </div>

                {/* 3. Action/Form Section - Fixed to 3 columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2">
                        <DetailsForm />
                    </div>

                    <div className="sticky top-24 lg:col-span-1">
                        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                            <div className="size-12 bg-gb-blue/10 rounded-2xl flex items-center justify-center">
                                <LifeBuoy className="text-gb-blue size-6" />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 text-lg">
                                    Need help?
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium mt-1">
                                    Our support team is available 24/7 to help
                                    you with your listings or bookings.
                                </p>
                            </div>
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 transition-all">
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
