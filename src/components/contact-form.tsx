"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "pending" | "success" | "validation-error" | "send-error";

type ServerErrors = Partial<Record<keyof ContactFormValues, string[]>>;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [sendError, setSendError] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    if (pending) return;

    setStatus("pending");
    setSendError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await res.json()) as {
        success: boolean;
        errors?: ServerErrors;
        message?: string;
      };

      if (result.success) {
        setStatus("success");
        form.reset();
        return;
      }

      if (result.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          const message = messages?.[0];
          if (message && field in form.getValues()) {
            form.setError(field as keyof ContactFormValues, { message });
          }
        }
        setStatus("validation-error");
        return;
      }

      setStatus("send-error");
      setSendError(result.message ?? "ไม่สามารถส่งข้อความได้ในขณะนี้");
    } catch {
      setStatus("send-error");
      setSendError("ไม่สามารถส่งข้อความได้ในขณะนี้");
    }
  }

  const pending = status === "pending";

  return (
    <div className="flex flex-col gap-4">
      <div aria-live="polite" className="sr-only">
        {pending && "กำลังส่งข้อความ"}
      </div>

      {status === "success" && (
        <p
          role="status"
          className="rounded-3xl border border-emerald-600/20 bg-emerald-600/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400"
        >
          ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด
        </p>
      )}

      {status === "send-error" && (
        <p
          role="alert"
          className="rounded-3xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {sendError}
        </p>
      )}

      {status === "validation-error" && (
        <p
          role="alert"
          className="rounded-3xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          กรุณาตรวจสอบข้อมูลในฟอร์มให้ถูกต้อง
        </p>
      )}

      <form id="form-contact" onSubmit={form.handleSubmit(onSubmit, () => setStatus("validation-error"))} noValidate>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-contact-name">ชื่อ</FieldLabel>
                <Input
                  {...field}
                  id="form-contact-name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.error ? "form-contact-name-error" : undefined
                  }
                  placeholder="สมชาย ใจดี"
                />
                {fieldState.invalid && (
                  <FieldError id="form-contact-name-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-contact-email">อีเมล</FieldLabel>
                <Input
                  {...field}
                  id="form-contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.error ? "form-contact-email-error" : undefined
                  }
                  placeholder="you@example.com"
                />
                {fieldState.invalid && (
                  <FieldError id="form-contact-email-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-contact-subject">หัวข้อ</FieldLabel>
                <Input
                  {...field}
                  id="form-contact-subject"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.error ? "form-contact-subject-error" : undefined
                  }
                  placeholder="สอบถามข้อมูลสินค้า"
                />
                {fieldState.invalid && (
                  <FieldError id="form-contact-subject-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-contact-message">ข้อความ</FieldLabel>
                <Textarea
                  {...field}
                  id="form-contact-message"
                  rows={5}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.error ? "form-contact-message-error" : undefined
                  }
                  placeholder="พิมพ์ข้อความที่ต้องการติดต่อ..."
                />
                {fieldState.invalid && (
                  <FieldError id="form-contact-message-error" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="website"
            control={form.control}
            render={({ field }) => (
              <div className="sr-only" aria-hidden="true">
                <FieldLabel htmlFor="form-contact-website">Website</FieldLabel>
                <Input {...field} id="form-contact-website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            )}
          />
        </FieldGroup>
      </form>

      <Button type="submit" form="form-contact" disabled={pending} className="w-full sm:w-auto">
        {pending && <Spinner />}
        {pending ? "กำลังส่ง..." : "ส่งข้อความ"}
      </Button>

      <p
        className={cn(
          "text-sm text-muted-foreground",
          pending && "animate-pulse"
        )}
        aria-hidden="true"
      >
        ระบบจะไม่เปิดเผยข้อมูลของคุณ
      </p>
    </div>
  );
}