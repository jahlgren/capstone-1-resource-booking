"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format, setHours, setMinutes } from "date-fns";
import { ChevronDownIcon, Clock } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { BookingPickerProps } from "../../types/resource";

const HOURS = Array.from({ length: 24 }, (_, i) => ({
    label: `${i.toString().padStart(2, "0")}:00`,
    value: `${i.toString().padStart(2, "0")}:00`,
}));

export default function HourlyBookingPicker({
    date,
    onSelect,
    bookedRanges,
}: BookingPickerProps) {
    const [open, setOpen] = useState(false);

    // 1. Memoize initial times so they don't recalculate on every render
    const defaults = useMemo(() => {
        const now = new Date();
        const nextHour = now.getHours() + 1;

        // Cap the start at 22:00 and end at 23:00 to keep it within the same day
        const start = `${
            Math.min(nextHour, 22).toString().padStart(2, "0")
        }:00`;
        const end = `${
            Math.min(nextHour + 1, 23).toString().padStart(2, "0")
        }:00`;

        return { start, end };
    }, []);

    const [startTime, setStartTime] = useState<string>(defaults.start);
    const [endTime, setEndTime] = useState<string>(defaults.end);

    const isToday = useMemo(
        () =>
            date?.from &&
            format(date.from, "yyyy-MM-dd") ===
                format(new Date(), "yyyy-MM-dd"),
        [date?.from],
    );

    const currentHour = new Date().getHours();

    // 2. Helper to merge Date object with HH:mm string
    const combineDateAndTime = useCallback(
        (baseDate: Date, timeString: string) => {
            const [hours, minutes] = timeString.split(":").map(Number);
            let newDate = new Date(baseDate);
            newDate = setHours(newDate, hours);
            newDate = setMinutes(newDate, minutes);
            return newDate;
        },
        [],
    );

    // 3. Effect: Auto-correct times if the user picks "Today" and selection is in the past
    useEffect(() => {
        if (isToday) {
            const selectedStartHour = parseInt(startTime.split(":")[0]);
            if (selectedStartHour <= currentHour) {
                const nextAvailable = Math.min(currentHour + 1, 22);
                setStartTime(`${nextAvailable.toString().padStart(2, "0")}:00`);
                setEndTime(
                    `${(nextAvailable + 1).toString().padStart(2, "0")}:00`,
                );
            }
        }
    }, [isToday, currentHour, startTime]);

    // 4. Effect: Sync local time state back to the parent component
    useEffect(() => {
        if (date?.from) {
            const newFrom = combineDateAndTime(date.from, startTime);
            const newTo = combineDateAndTime(date.from, endTime);

            // Only trigger onSelect if the values actually changed to prevent infinite loops
            if (
                newFrom.getTime() !== date.from.getTime() ||
                newTo.getTime() !== date.to?.getTime()
            ) {
                onSelect({ from: newFrom, to: newTo });
            }
        }
    }, [
        startTime,
        endTime,
        date?.from,
        date?.to,
        onSelect,
        combineDateAndTime,
    ]);

    return (
        <FieldGroup className="w-full flex flex-col gap-4">
            {/* Date Picker Section */}
            <Field className="w-full">
                <FieldLabel>Select Date</FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-between font-normal h-12 rounded-xl bg-white border-slate-200"
                        >
                            {date?.from
                                ? format(date.from, "PPP")
                                : "Select date"}
                            <ChevronDownIcon className="size-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto p-0 z-[100] bg-white shadow-2xl rounded-3xl border-none"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={date?.from}
                            onSelect={(newDay) => {
                                if (newDay) {
                                    onSelect({ from: newDay, to: newDay });
                                    setOpen(false);
                                }
                            }}
                            disabled={[{ before: new Date() }, ...bookedRanges]}
                        />
                    </PopoverContent>
                </Popover>
            </Field>

            {/* Time Selectors Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                    <FieldLabel>From</FieldLabel>
                    <Select value={startTime} onValueChange={setStartTime}>
                        <SelectTrigger className="rounded-xl h-12 bg-white border-slate-200">
                            <Clock className="mr-2 h-4 w-4 opacity-50 text-gb-blue" />
                            <SelectValue placeholder="Start Time" />
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-[200px]">
                            {HOURS.filter((h) => {
                                if (!isToday) return true;
                                return parseInt(h.value) > currentHour;
                            }).map((h) => (
                                <SelectItem key={h.value} value={h.value}>
                                    {h.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <FieldLabel>To</FieldLabel>
                    <Select value={endTime} onValueChange={setEndTime}>
                        <SelectTrigger className="rounded-xl h-12 bg-white border-slate-200">
                            <Clock className="mr-2 h-4 w-4 opacity-50 text-gb-blue" />
                            <SelectValue placeholder="End Time" />
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-[200px]">
                            {HOURS.filter((h) => {
                                return parseInt(h.value) >
                                    parseInt(startTime.split(":")[0]);
                            }).map((h) => (
                                <SelectItem key={h.value} value={h.value}>
                                    {h.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
            </div>
        </FieldGroup>
    );
}
