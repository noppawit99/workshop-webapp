import Link from "next/link";
import { ArrowRight, Truck, Headset, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  {
    icon: Truck,
    title: "จัดส่งฟรี",
    detail: "เมื่อสั่งซื้อครบ ฿999",
  },
  {
    icon: BadgePercent,
    title: "รับประกันราคา",
    detail: "ถูกสุดหรือคืนต่าง",
  },
  {
    icon: Headset,
    title: "บริการ 24/7",
    detail: "แชทกับทีมเราได้เสมอ",
  },
];

export function PromoStrip() {
  return (
    <section className="mx-auto max-w-(--breakpoint-xl) px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {perks.map((perk) => (
          <div
            key={perk.title}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-subtle"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <perk.icon className="size-6" />
            </span>
            <div>
              <p className="font-bold">{perk.title}</p>
              <p className="text-sm text-muted-foreground">{perk.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-(--breakpoint-xl) px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-secondary px-8 py-12 sm:px-12">
        <div className="relative z-10 max-w-lg">
          <p className="text-sm font-bold uppercase tracking-[0.1em] text-secondary-foreground/70">
            Limited Time · ลดสูงสุด 40%
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-secondary-foreground sm:text-4xl">
            Mid-Year Tech Sale
          </h2>
          <p className="mt-3 text-secondary-foreground/80">
            โปรโมชันสุดปัง เก็บของเข้าคาร์ตวันนี้ ก่อนราคาคืนตัว
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-foreground text-background hover:bg-foreground/85"
          >
            <Link href="/product">
              ดูสินค้าลดราคา <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>

        <div className="absolute -top-10 -right-10 hidden size-64 rounded-full bg-background/20 sm:block" />
        <div className="absolute -right-20 -bottom-20 hidden size-80 rounded-full bg-primary/20 sm:block" />
      </div>
    </section>
  );
}