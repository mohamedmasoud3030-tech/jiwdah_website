import { pgTable, pgEnum, serial, varchar, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import {
  INQUIRY_STATUS_VALUES,
  PROJECT_STATUS_VALUES,
  CONTENT_STATUS_VALUES,
  ROLE_VALUES,
} from "./enums";

export * from "./enums";

export type ProjectLocalizedText = { ar: string; en: string };
export type ProjectLocalizedList = { ar: string[]; en: string[] };
export type ProjectVisualKind = "brand" | "platform" | "campaign" | "commerce" | "launch" | "automation" | "dashboard" | "story";
export type ProjectAssetLayout = "wide" | "standard" | "tall";
export type ProjectContentBlocks = {
  overview?: ProjectLocalizedText;
  challenge?: ProjectLocalizedText;
  direction?: ProjectLocalizedText;
  solution?: ProjectLocalizedText;
  features?: ProjectLocalizedList;
  journey?: ProjectLocalizedList;
};
export type ProjectGalleryItem = {
  url: string;
  label?: ProjectLocalizedText;
  caption?: ProjectLocalizedText;
  kind?: ProjectVisualKind;
  layout?: ProjectAssetLayout;
};

export const roleEnum = pgEnum("role", ROLE_VALUES);
export const inquiryStatusEnum = pgEnum("inquiry_status", INQUIRY_STATUS_VALUES);
export const projectStatusEnum = pgEnum("project_status", PROJECT_STATUS_VALUES);
export const contentStatusEnum = pgEnum("content_status", CONTENT_STATUS_VALUES);

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

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  service: varchar("service", { length: 255 }),
  message: text("message").notNull(),
  source: varchar("source", { length: 50 }).default("contact").notNull(),
  status: inquiryStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  summary: text("summary"),
  description: text("description"),
  imageUrl: text("image_url"),
  projectUrl: text("project_url"),
  repositoryUrl: text("repository_url"),
  contentBlocks: jsonb("content_blocks").$type<ProjectContentBlocks>().default({}).notNull(),
  gallery: jsonb("gallery").$type<ProjectGalleryItem[]>().default([]).notNull(),
  relatedServices: jsonb("related_services").$type<string[]>().default([]).notNull(),
  status: projectStatusEnum("status").default("draft").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

export const contentEntries = pgTable("content_entries", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  status: contentStatusEnum("status").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ContentEntry = typeof contentEntries.$inferSelect;
export type InsertContentEntry = typeof contentEntries.$inferInsert;
