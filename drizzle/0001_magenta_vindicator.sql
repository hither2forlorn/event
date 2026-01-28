ALTER TABLE "event" RENAME COLUMN "date" TO "startDate";--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "endDate" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "budget" integer;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "theme" text;--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "duration";