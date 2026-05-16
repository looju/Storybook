CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"imageUrl" varchar,
	"subscription" boolean DEFAULT false,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "videoData" (
	"id" serial PRIMARY KEY NOT NULL,
	"script" json NOT NULL,
	"audioFileUrl" varchar NOT NULL,
	"captions" json NOT NULL,
	"imageList" varchar[],
	"createdBy" varchar NOT NULL
);
