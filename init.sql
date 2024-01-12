CREATE TABLE "users" (
  "uid" SERIAL PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "created_at" timestamp
);

CREATE TABLE "listings" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "description" text,
  "categories" integer,
  "uid" integer,
  "created_at" timestamp,
  "active" boolean,
  UNIQUE ("categories")
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "category" varchar,
  UNIQUE ("id")
);

ALTER TABLE "listings" ADD FOREIGN KEY ("uid") REFERENCES "users" ("uid");

CREATE TABLE "listings_categories" (
  "listings_id" integer,
  "categories_id" integer,
  PRIMARY KEY ("listings_id", "categories_id")
);

ALTER TABLE "listings_categories" ADD FOREIGN KEY ("listings_id") REFERENCES "listings" ("id");

ALTER TABLE "listings_categories" ADD FOREIGN KEY ("categories_id") REFERENCES "categories" ("id");