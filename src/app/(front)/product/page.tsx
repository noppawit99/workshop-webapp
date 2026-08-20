import fs from "fs";
import path from "path";
import { connection } from "next/server";
import FeaturesProduct from "@/components/features-product";
import prisma from "@/lib/prisma";

const IMAGE_DIR = path.join(process.cwd(), "public", "product-image");

function resolvePicture(imageName: string | null): string {
  if (imageName && fs.existsSync(path.join(IMAGE_DIR, imageName))) {
    return imageName;
  }
  return "macbook-air.png";
}

type ProductView = {
  id: number;
  name: string;
  price: number;
  picture: string;
};

export default async function ProductPage() {
  await connection();
  let products: ProductView[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      include: { images: true },
      orderBy: { id: "asc" },
    });

    products = dbProducts.map((p) => ({
      id: p.id,
      name: p.name ?? "",
      price: p.price ?? 0,
      picture: resolvePicture(p.images[0]?.imageName ?? null),
    }));
  } catch (error) {
    console.error("Database fetch error:", error);
    products = [
      { id: 1, name: "MacBook Air M3", price: 44900, picture: "macbook-air.png" },
      { id: 2, name: "iPhone 16 Pro", price: 45900, picture: "airpods-pro.png" },
      { id: 3, name: "Samsung Galaxy S25", price: 32900, picture: "galaxy-s24.png" },
      { id: 4, name: "AirPods Pro 2", price: 8990, picture: "airpods-pro.png" },
      { id: 5, name: "iPad Air M2", price: 33900, picture: "ipad-air.png" },
      { id: 6, name: "Google Pixel 9", price: 29900, picture: "galaxy-s24.png" },
    ];
  }

  return (
    <FeaturesProduct products={products} />
  );
}