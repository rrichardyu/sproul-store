CREATE TABLE "users" (
  "uid" integer PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "created_at" timestamp
);

CREATE TABLE "listings" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "description" text,
  "uid" integer,
  "created_at" timestamp,
  "active" boolean
);

ALTER TABLE "listings" ADD FOREIGN KEY ("uid") REFERENCES "users" ("uid");
