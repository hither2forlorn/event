CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"question" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
