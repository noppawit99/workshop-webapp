import Link from "next/link";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const contactItems = [
  {
    icon: MapPin,
    label: "ที่อยู่",
    value: "123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
  },
  {
    icon: Phone,
    label: "โทรศัพท์",
    value: "02-123-4567",
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: "contact@cosci.com",
  },
  {
    icon: Clock,
    label: "เวลาทำการ",
    value: "จันทร์ - เสาร์ 09:00 - 18:00 น.",
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

const faqs = [
  {
    question: "ใช้เวลานานเท่าไหร่ถึงจะได้รับการตอบกลับ?",
    answer:
      "โดยปกติเราจะตอบกลับภายใน 1-2 วันทำการ หลังจากได้รับข้อความของคุณ",
  },
  {
    question: "สามารถสอบถามเรื่องสั่งสินค้าล่วงหน้าได้ไหม?",
    answer:
      "ได้ครับ/ค่ะ สามารถติดต่อผ่านฟอร์มนี้เพื่อสอบถามสินค้าที่ต้องการสั่งจองล่วงหน้าได้",
  },
  {
    question: "มีบริการจัดส่งไปต่างจังหวัดหรือไม่?",
    answer:
      "มีครับ/ค่ะ เราจัดส่งสินค้าทั่วประเทศไทยผ่านบริการขนส่งเอกชน",
  },
  {
    question: "ร้านอยู่ใกล้รถไฟฟ้าไหม?",
    answer:
      "ร้านตั้งอยู่ใกล้สถานีรถไฟฟ้าบีทีเอส ศาลาแดง เดินเพียง 5 นาที",
  },
];

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <main className="flex min-h-screen justify-center px-6 py-16 sm:py-20">
      <div className="w-full grow max-w-(--breakpoint-xl)">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-medium tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
            ติดต่อเรา
          </h1>
          <p className="mt-3 text-pretty text-lg text-muted-foreground tracking-[-0.01em] sm:text-2xl">
            สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Contact info */}
          <section aria-labelledby="contact-info-heading" className="flex flex-col gap-8">
            <h2
              id="contact-info-heading"
              className="text-2xl font-medium tracking-[-0.02em]"
            >
              ข้อมูลติดต่อ
            </h2>

            <dl className="grid gap-4 sm:grid-cols-2">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border p-5"
                >
                  <dt className="flex items-center gap-2 font-medium text-xl tracking-[-0.015em]">
                    <item.icon className="size-5 text-muted-foreground" aria-hidden="true" />
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-muted-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="rounded-xl border p-5">
              <h3 className="font-medium text-xl tracking-[-0.015em]">
                Social
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-xl tracking-[-0.015em]">
                คำถามที่พบบ่อย
              </h3>
              <ul className="mt-4 flex flex-col gap-4">
                {faqs.map((faq) => (
                  <li
                    key={faq.question}
                    className="rounded-xl border p-5"
                  >
                    <p className="font-medium">{faq.question}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact form */}
          <section aria-labelledby="contact-form-heading" className="lg:pt-18">
            <Card>
              <CardHeader>
                <CardTitle id="contact-form-heading">ส่งข้อความถึงเรา</CardTitle>
                <CardDescription>
                  กรอกข้อมูลด้านล่างแล้วเราจะติดต่อกลับโดยเร็วที่สุด
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}