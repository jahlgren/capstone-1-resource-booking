CREATE TYPE "public"."price_unit" AS ENUM('hour', 'day', 'week', 'month');
CREATE TYPE "public"."resource_type" AS ENUM('Appartments & Spaces', 'Tools & Equipment', 'Office & Teach');


ALTER TABLE "resource" ADD COLUMN "price" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "resource" ADD COLUMN "price_unit" "price_unit" DEFAULT 'hour' NOT NULL;--> statement-breakpoint
ALTER TABLE "resource" ADD COLUMN "type" "resource_type" DEFAULT 'Appartments & Spaces' NOT NULL;