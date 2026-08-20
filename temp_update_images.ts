import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client";
import mysql from "mysql2";

const connectionString = process.env.DATABASE_URL || "";
const pool = mysql.createPool(connectionString);
const adapter = new PrismaMariaDb(pool);
const prisma = new PrismaClient({ adapter });

async function updateProductImages() {
  try {
    console.log("Fetching products...");
    const products = await prisma.product.findMany();
    
    const imageMap = {
      "Macbook": "macbook-air.png",
      "iPad": "ipad-air.png",
      "Galaxy": "galaxy-s24.png",
      "S24": "galaxy-s24.png",
      "AirPods": "airpods-pro.png",
    };

    for (const product of products) {
      const name = product.name || "";
      let matchedImage = null;

      for (const [keyword, fileName] of Object.entries(imageMap)) {
        if (name.toLowerCase().includes(keyword.toLowerCase())) {
          matchedImage = fileName;
          break;
        }
      }

      if (matchedImage) {
        console.log(`Updating product ${product.id} (${name}) with image ${matchedImage}`);
        
        // Delete existing images for this product to avoid duplicates
        await prisma.productImage.deleteMany({
          where: { productId: product.id }
        });

        // Create new image record
        await prisma.productImage.create({
          data: {
            productId: product.id,
            imageName: matchedImage
          }
        });
      }
    }
    console.log("Successfully updated product images.");
  } catch (e) {
    console.error("Error updating images:", e);
  } finally {
    await prisma.$disconnect();
  }
}

updateProductImages();
