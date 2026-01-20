CREATE TABLE "ventures" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"avatar" text,
	"password" text,
	"deviceTokens" json,
	"info" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "ventures_email_unique" UNIQUE("email")
);
