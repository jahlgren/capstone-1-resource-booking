import { pgTable, text, timestamp, boolean, real ,pgEnum } from "drizzle-orm/pg-core";


const resourceTypeEnum = pgEnum("resource_type", ["Apartments & Spaces", "Vehicles & Transport", "Tools & Equipment", "Office & Tech"]);
const priceUnitEnum = pgEnum("price_unit", ["hour", "day", "week", "month"]);

export const resource = pgTable("resource", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    image: text("image"),
    price: real("price").default(0).notNull(),
    priceUnit: priceUnitEnum("price_unit").default("hour").notNull(),
    category: resourceTypeEnum("resource_type").default("Apartments & Spaces").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})
