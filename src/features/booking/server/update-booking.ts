import db from "@/db";
import { booking } from "../model/booking";
import { eq } from "drizzle-orm";
import { UpdateBookingPayload } from "../types/booking";

export async function updateBooking(id: string, data: UpdateBookingPayload) {
    const results = await db
        .update(booking)
        .set({
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
        })
        .where(eq(booking.id, id))
        .returning();
    if (!results.length) throw new Error("insert-failed");
    return results[0]
}