CREATE TYPE "public"."event_type" AS ENUM('wedding');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('client', 'vendor');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"info" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"parentId" integer,
	"title" text,
	"question" json,
	"createdAt" timestamp DEFAULT now(),
	"infos" json,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"type" "event_type" NOT NULL,
	"date" timestamp NOT NULL,
	"duration" text,
	"parentid" integer,
	"location" text,
	"organizer" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"info" json,
	"role" "role" DEFAULT 'client' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vendors" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_name" text,
	"description" text,
	"owner" integer,
	"city" text,
	"nation" text,
	"culture" text,
	"theme" text,
	"infos" json,
	"createdAt" timestamp DEFAULT now(),
	"space" text,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_organizer_users_id_fk" FOREIGN KEY ("organizer") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;