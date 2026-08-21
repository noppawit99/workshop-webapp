import Link from "next/link";
import prisma from "@/lib/prisma";

type Customer = {
  id: number;
  name: string | null;
  address: string | null;
  phone: string | null;
};


export default async function CustomerPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(parseInt(searchParams.page ?? "1", 10), 1);
  const pageSize = 3;
  const skip = (page - 1) * pageSize;

  // Fetch customers for current page
  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      skip,
      take: pageSize,
      orderBy: { id: "asc" },
    }),
    prisma.customer.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ลูกค้า</h1>
      <ul className="space-y-2">
        {customers.map((c) => (
          <li key={c.id} className="border p-2 rounded">
            <p className="font-medium">{c.name ?? "(ไม่มีชื่อ)"}</p>
            <p>{c.address ?? "-"}</p>
            <p>{c.phone ?? "-"}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-4">
        {page > 1 && (
          <Link href={`?page=${page - 1}`} className="text-blue-600 hover:underline">
            ← หน้าก่อนหน้า
          </Link>
        )}
        {page < totalPages && (
          <Link href={`?page=${page + 1}`} className="text-blue-600 hover:underline">
            หนถัดไป →
          </Link>
        )}
      </div>
    </div>
  );
}
