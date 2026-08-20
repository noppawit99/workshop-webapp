import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = contactSchema.safeParse(body ?? {});

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, subject, message, website } = parsed.data;

  // Honeypot: pretend success but never send.
  if (website) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { success: false, message: "ไม่สามารถส่งข้อความได้ในขณะนี้" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[ติดต่อร้าน] ${subject}`,
      text: `ชื่อผู้ติดต่อ: ${name}\nอีเมล: ${email}\nหัวข้อ: ${subject}\n\n${message}`,
    });

    if (error) {
      console.error("Contact email send failed:", error);
      return NextResponse.json(
        { success: false, message: "ไม่สามารถส่งข้อความได้ในขณะนี้" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Contact email send threw:", err);
    return NextResponse.json(
      { success: false, message: "ไม่สามารถส่งข้อความได้ในขณะนี้" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}