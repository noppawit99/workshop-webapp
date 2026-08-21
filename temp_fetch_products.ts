import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client";
// Use PrismaMariaDb adapter directly with the connection string – no external mysql2 pool needed
const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
    });
    console.log(JSON.stringify(products, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
