import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const leads = mysqlTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  service: varchar("service", { length: 255 }).notNull(),
  eventDate: varchar("event_date", { length: 50 }),
  location: varchar("location", { length: 255 }),
  budget: varchar("budget", { length: 100 }),
  guests: int("guests"),
  notes: text("notes"),
  status: mysqlEnum("status", ["new", "contacted", "confirmed", "completed", "cancelled"])
    .default("new")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

export const portfolio = mysqlTable("portfolio", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: mysqlEnum("category", [
    "wedding",
    "conference",
    "private",
    "corporate",
    "coffee",
    "vip",
  ]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PortfolioItem = typeof portfolio.$inferSelect;
export type InsertPortfolioItem = typeof portfolio.$inferInsert;
