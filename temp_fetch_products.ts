import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client";
import mysql from "mysql2";

const connectionString = process.env.DATABASE_URL || "";
const pool = mysql.createPool(connectionString);
const adapter = new PrismaMariaDb(pool);
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
