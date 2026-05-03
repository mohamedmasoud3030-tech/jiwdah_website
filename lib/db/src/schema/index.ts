import { pgTable, pgEnum, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";
import { SERVICE_VALUES, CATEGORY_VALUES, LEAD_STATUS_VALUES, ROLE_VALUES } from "./enums";

export * from "./enums";

export const roleEnum = pgEnum("role", ROLE_VALUES);
export const leadStatusEnum = pgEnum("lead_status", LEAD_STATUS_VALUES);
export const portfolioCategoryEnum = pgEnum("portfolio_category", CATEGORY_VALUES);
export const serviceEnum = pgEnum("service", SERVICE_VALUES);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("union_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).unique(),
  avatar: text("avatar"),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignInAt: timestamp("last_sign_in_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  service: serviceEnum("service").notNull(),
  eventDate: varchar("event_date", { length: 50 }),
  location: varchar("location", { length: 255 }),
  budget: varchar("budget", { length: 100 }),
  guests: integer("guests"),
  notes: text("notes"),
  status: leadStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

export const portfolio = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: portfolioCategoryEnum("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PortfolioItem = typeof portfolio.$inferSelect;
export type InsertPortfolioItem = typeof portfolio.$inferInsert;
