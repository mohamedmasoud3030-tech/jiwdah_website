import { getDb } from "./connection";
import { portfolio } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export async function getAllPortfolio() {
  const db = getDb();
  return db.select().from(portfolio).orderBy(desc(portfolio.createdAt));
}

export async function getPortfolioByCategory(category: string) {
  const db = getDb();
  return db
    .select()
    .from(portfolio)
    .where(eq(portfolio.category, category as "wedding" | "conference" | "private" | "corporate" | "coffee" | "vip"))
    .orderBy(desc(portfolio.createdAt));
}

export async function createPortfolioItem(data: {
  title: string;
  imageUrl: string;
  category: string;
}) {
  const db = getDb();
  return db.insert(portfolio).values({
    title: data.title,
    imageUrl: data.imageUrl,
    category: data.category as "wedding" | "conference" | "private" | "corporate" | "coffee" | "vip",
  });
}

export async function deletePortfolioItem(id: number) {
  const db = getDb();
  return db.delete(portfolio).where(eq(portfolio.id, id));
}
