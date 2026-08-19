import FeaturesProduct from "@/components/features-product";

type Props = {
  products: any[];
};

const FeaturesProductWithFallack = ({ products }: Props) => {
  return (
    <FeaturesProduct products={products} />
  );
};

export default async function ProductPage() {
  // Try to fetch from database, fall back to static products
  let products: any[] = [];

  try {
    const { connection } = await import("next/server");
    await connection();
    const prisma = await import("@/lib/prisma").then((mod) => mod.default);
    const dbProducts = await prisma.product.findMany();

    // แปลง Decimal → number ก่อนส่งให้ Client Component
    products = dbProducts.map((p: any) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      picture: p.picture,
    }));
  } catch (error) {
    // Fall back to static products when database connection fails
    products = [
      { id: 1, name: "MacBook Air M3", price: 44900, picture: "macbook-air.png" },
      { id: 2, name: "iPhone 16 Pro", price: 45900, picture: "airpods-pro.png" },
      { id: 3, name: "Samsung Galaxy S25", price: 32900, picture: "galaxy-s24.png" },
      { id: 4, name: "AirPods Pro 2", price: 8990, picture: "ipad-air.png" },
      { id: 5, name: "iPad Air M2", price: 33900, picture: "airpods-pro.png" },
      { id: 6, name: "Google Pixel 9", price: 29900, picture: "galaxy-s24.png" },
    ];
  }

  return (
    <FeaturesProductWithFallack products={products} />
  );
}