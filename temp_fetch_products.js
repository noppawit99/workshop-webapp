const prisma = require('./generated/prisma/client').default;

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
