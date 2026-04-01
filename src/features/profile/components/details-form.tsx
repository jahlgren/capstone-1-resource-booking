"use client";

import { useState } from "react"; // 1. Add state
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import { Bell, MapPin } from "lucide-react";
import { ProfileProps } from "../types/profile";
import toast from "react-hot-toast";

export default function DetailsForm({ user }: ProfileProps) {
    // 2. Track the switches in local state
    const [notifications, setNotifications] = useState(true);
    const [visibility, setVisibility] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        
        // Simulate an API call
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Preferences saved successfully!");
        }, 1000);
    };

    return (
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-9">
            <div>
                <h3 className="text-2xl font-black text-slate-900">
                    Personal Details
                </h3>
                <p className="text-slate-500 text-sm font-medium mt-1">
                    Manage your account information and email preferences.
                </p>
            </div>

            {/* Read-only Identity Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-1">
                        Full Name
                    </Label>
                    <Input
                        className="rounded-2xl h-14 bg-slate-50 border-none font-semibold cursor-default"
                        readOnly // Changed from disabled to readOnly for better contrast
                        value={user?.name || ""}
                    />
                </div>
                <div className="space-y-3">
                    <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-1">
                        Email Address
                    </Label>
                    <Input
                        className="rounded-2xl h-14 bg-slate-50 border-none font-semibold cursor-default"
                        readOnly
                        value={user?.email || ""}
                    />
                </div>
            </div>

            {/* Interactive Preferences Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-3xl bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-white flex items-center justify-center text-gb-blue shadow-sm">
                            <Bell size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">Booking Notifications</p>
                            <p className="text-xs text-slate-500">Receive an email when a new booking is requested.</p>
                        </div>
                    </div>
                    <Switch 
                        checked={notifications} 
                        onCheckedChange={setNotifications} 
                    />
                </div>

                <div className="flex items-center justify-between p-4 rounded-3xl bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">Location Visibility</p>
                            <p className="text-xs text-slate-500">Show your general location on your public listings.</p>
                        </div>
                    </div>
                    <Switch 
                        checked={visibility} 
                        onCheckedChange={setVisibility} 
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
                <Button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gb-blue hover:bg-gb-blue/90 text-white rounded-2xl px-10 h-14 font-black shadow-lg shadow-gb-blue/20 transition-all hover:scale-105 active:scale-95 text-lg"
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
}