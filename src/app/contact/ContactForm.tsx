"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "pending" | "error";

export function ContactForm({ serviceTitle = "" }: { serviceTitle?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (String(data.get("company") ?? "").trim()) {
      form.reset();
      setStatus("sent");
      return;
    }

    const recipient = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
    if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
      setStatus("error");
      setError("Contact email is not configured yet. Add NEXT_PUBLIC_CONTACT_EMAIL in Vercel project settings.");
      return;
    }
    const subject = serviceTitle ? `Service order: ${serviceTitle} from ${name}` : `Portfolio note from ${name}`;
    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("pending");
  }

  return (
    <form className="d-grid gap-3" onSubmit={onSubmit}>
      <label className="form-label">
        Name
        <input required name="name" autoComplete="name" className="form-control mt-1" />
      </label>
      <label className="form-label">
        Email
        <input required type="email" name="email" autoComplete="email" className="form-control mt-1" />
      </label>
      <label className="form-label">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="form-control mt-1"
          defaultValue={serviceTitle ? `I want to order ${serviceTitle}.\n\nWhat I need:\n` : undefined}
        />
      </label>
      <input className="visually-hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden />
      <button type="submit" className="btn btn-primary rounded-pill contact-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : serviceTitle ? "Send order" : "Send email"}
      </button>
      {status === "sent" ? (
        <p className="contact-note contact-note-ok mb-0" role="status">
          Your email app has opened. Please send the message there.
        </p>
      ) : null}
      {status === "pending" ? (
        <p className="contact-note mb-0" role="status">
          Your email app should open with the draft. Press Send there to complete it.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="contact-note contact-note-bad mb-0" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
