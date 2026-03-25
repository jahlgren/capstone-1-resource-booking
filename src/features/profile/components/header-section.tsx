"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { ProfileProps } from "../types/profile";
import { format } from "date-fns";

export default function HeaderSection({ user }: ProfileProps) {
    const profileCreatedAt = format(user.createdAt, "MMM dd, yyyy");

    return (
        <div className="relative pb-10 border-b border-slate-100">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                <Avatar className="size-22 border-4 border-white shadow-xl ring-1 ring-slate-100">
                    <AvatarImage src={user.image || "/assets/placeholder.svg"} />
                    <AvatarFallback className="bg-gb-blue text-white text-3xl font-black">
                        {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            {user.name}
                        </h1>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold rounded-full">
                            Verified Member
                        </Badge>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                            <CalendarDays className="size-4 text-gb-blue" />
                            <span>Joined {profileCreatedAt}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-4 text-gb-blue" />
                            <span>Helsinki, Finland</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
