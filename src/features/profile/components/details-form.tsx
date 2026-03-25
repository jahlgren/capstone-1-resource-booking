"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function DetailsForm() {
    return (
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
            <div>
                <h3 className="text-2xl font-black text-slate-900">
                    Personal Details
                </h3>
                <p className="text-slate-500 text-sm font-medium mt-1">
                    Manage your account information and email preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-1">
                        Full Name
                    </Label>
                    <Input
                        className="rounded-2xl h-14 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-gb-blue/20 transition-all font-semibold"
                        placeholder="Luchin Dan"
                    />
                </div>
                <div className="space-y-3">
                    <Label className="font-black text-xs uppercase tracking-widest text-slate-400 ml-1">
                        Email Address
                    </Label>
                    <Input
                        className="rounded-2xl h-14 bg-slate-50 border-none opacity-60 font-semibold"
                        disabled
                        value="danluchin04@gmail.com"
                    />
                </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex justify-end">
                <Button className="bg-gb-blue hover:bg-gb-blue/90 text-white rounded-2xl px-10 h-14 font-black shadow-lg shadow-gb-blue/20 transition-all hover:scale-105 active:scale-95 text-lg">
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
