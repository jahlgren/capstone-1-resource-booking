import { pgTable, text, integer, timestamp, check  } from "drizzle-orm/pg-core";
import { resource } from "@/features/resource/model/resource";
import { sql } from "drizzle-orm";

export const rating = pgTable("rating", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    resourceId: text("resource_id")
        .notNull()
        .references(() => resource.id, { onDelete: "cascade" }),
    stars: integer("stars").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
    starsRangeCheck: check("stars_check", sql`${table.stars} >= 1 AND ${table.stars} <= 5`),
}));