import { user } from "@/features/auth/models/user";
import { resource } from "@/features/resource/model/resource";
import { pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";


export const favorites = pgTable("favorites", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id),
    resourceId: text("resource_id").notNull().references(() => resource.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull()
    }, 
    (t) => ({
        userResourceUnique: unique("favorite_user_resource_unique").on(t.userId, t.resourceId),
    }));
