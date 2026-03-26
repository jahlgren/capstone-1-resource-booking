import { resource } from "../model/resource";
import db from "@/db";
import { and, eq } from "drizzle-orm";

export async function updateResource(id: string, data: any, userId: string) {
    const updated = await db
        .update(resource)
        .set(data)
        .where(and(eq(resource.id, id), eq(resource.userId, userId)))
        .returning();
    if (!updated.length) throw new Error("update-failed");
    return updated[0];
}