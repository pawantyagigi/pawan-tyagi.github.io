"use client";

import { FormEvent, useState } from "react";
import config from "@/lib/config";

type Status = "idle" | "sending" | "success" | "error";

const LINKEDIN =
  config.linkedin_account ||
  "https://www.linkedin.com/in/pawan-tyagi-6bb22357/";

const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const contactEmail =
    config.contact_email?.trim() || "pawangurugi@gmail.com";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email) {
      setStatus("error");
      setErrorMsg("Please fill in your name and email.");
      return;
    }

    if (!message) {
      setStatus("error");
      setErrorMsg("Please enter a message.");
      return;
    }

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `New blog lead from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const payload = (await res.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;

      if (!res.ok || payload?.success === false) {
        throw new Error(payload?.message || "Submit failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please try again or reach out on LinkedIn."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="contact-form-card contact-form-success" role="status">
        <h2>Thanks for reaching out</h2>
        <p>
          Your message is on its way to my inbox. You can also find me on{" "}
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          .
        </p>
        <button
          type="button"
          className="contact-form-submit"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form-card" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-header">
        <h2 id="send-a-message">Send a message</h2>
        <p>Fill in the form and it lands straight in my inbox.</p>
      </div>

      <label className="contact-form-field" htmlFor="contact-name">
        <span>
          Name <em>(required)</em>
        </span>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />
      </label>

      <label className="contact-form-field" htmlFor="contact-email">
        <span>
          Email <em>(required)</em>
        </span>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </label>

      <label className="contact-form-field" htmlFor="contact-message">
        <span>
          Message <em>(required)</em>
        </span>
        <textarea id="contact-message" name="message" rows={5} required />
      </label>

      {status === "error" ? (
        <p className="contact-form-error" role="alert">
          {errorMsg}
        </p>
      ) : null}

      <button
        type="submit"
        className="contact-form-submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Contact Us"}
      </button>
    </form>
  );
};

export default ContactForm;
