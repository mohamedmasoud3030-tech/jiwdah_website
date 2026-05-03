import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const PORTFOLIO_SEED = [
  { title: "حفل زفاف فاخر - مسقط", imageUrl: "/api/uploads/service-wedding.jpg", category: "wedding" },
  { title: "ضيافة VIP لمسؤولين", imageUrl: "/api/uploads/service-vip.jpg", category: "vip" },
  { title: "مؤتمر شركات كبرى", imageUrl: "/api/uploads/service-conference.jpg", category: "conference" },
  { title: "ضيافة شركة رائدة", imageUrl: "/api/uploads/service-corporate.jpg", category: "corporate" },
  { title: "قهوة عربية تراثية", imageUrl: "/api/uploads/service-coffee.jpg", category: "coffee" },
  { title: "فعالية خاصة مميزة", imageUrl: "/api/uploads/service-events.jpg", category: "private" },
  { title: "حفل زفاف ملكي", imageUrl: "/api/uploads/portfolio_1.webp", category: "wedding" },
  { title: "مناسبة VIP حصرية", imageUrl: "/api/uploads/portfolio_2.webp", category: "vip" },
  { title: "معرض ضيافة الأعمال", imageUrl: "/api/uploads/portfolio-1.jpg", category: "corporate" },
  { title: "تجمع عائلي فاخر", imageUrl: "/api/uploads/portfolio-2.jpg", category: "private" },
  { title: "قهوة عربية في ملتقى", imageUrl: "/api/uploads/portfolio-3.jpg", category: "coffee" },
  { title: "حفل خطوبة متميز", imageUrl: "/api/uploads/portfolio-4.jpg", category: "wedding" },
];

async function seed() {
  console.log("Seeding portfolio table...");

  const countResult = await pool.query("SELECT COUNT(*) FROM portfolio");
  const count = parseInt(countResult.rows[0].count, 10);

  if (count > 0) {
    console.log(`Portfolio already has ${count} items. Skipping seed.`);
    await pool.end();
    return;
  }

  for (const item of PORTFOLIO_SEED) {
    await pool.query(
      "INSERT INTO portfolio (title, image_url, category) VALUES ($1, $2, $3)",
      [item.title, item.imageUrl, item.category]
    );
  }

  console.log(`Inserted ${PORTFOLIO_SEED.length} portfolio items.`);
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
