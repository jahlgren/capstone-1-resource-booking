CREATE TABLE "rating" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"resource_id" text NOT NULL,
	"stars" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "stars_check" CHECK ("rating"."stars" >= 1 AND "rating"."stars" <= 5)
);
--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_resource_id_resource_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resource"("id") ON DELETE cascade ON UPDATE no action;