"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type LinkItem = { href: string; label: string; external?: boolean };
type ChatMessage = { id: string; role: "assistant" | "user"; text: string; links?: LinkItem[] };

const welcome: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi. I can help you learn about Kulsoom.\n\nAsk about her projects, skills, jobs, or how to contact her.",
};

const starters = ["See projects", "Her skills", "Contact her"];

export function SiteAgent() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [suggestions, setSuggestions] = useState(starters);
  const [topic, setTopic] = useState("welcome");
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, pending, open]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || pending) return;
    setDraft("");
    setMessages((current) => [...current, { id: `u-${Date.now()}`, role: "user", text: question }]);
    setPending(true);
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          topic,
          history: messages.slice(-8).map((item) => ({ role: item.role, text: item.text })),
        }),
      });
      const result = (await response.json()) as { text?: string; links?: LinkItem[]; suggestions?: string[]; topic?: string; error?: string };
      setMessages((current) => [
        ...current,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: result.text || result.error || "I could not answer that just now.",
          links: result.links ?? [],
        },
      ]);
      if (result.topic) setTopic(result.topic);
      if (result.suggestions?.length) setSuggestions(result.suggestions);
    } catch {
      setMessages((current) => [
        ...current,
        { id: `a-${Date.now()}`, role: "assistant", text: "I cannot answer right now. You can still send a note on the contact page." },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="site-agent">
      {open ? (
        <section className="agent-panel" role="dialog" aria-modal="false" aria-labelledby={titleId}>
          <header className="agent-head">
            <div>
              <p className="kicker mb-1">Portfolio assistant</p>
              <h2 id={titleId} className="h6 mb-0">
                Ask about Kulsoom
              </h2>
            </div>
            <button type="button" className="cert-close" aria-label="Close assistant" onClick={() => setOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>
          <div className="agent-log" ref={listRef}>
            {messages.map((message) => (
              <article key={message.id} className={`agent-msg agent-msg-${message.role}`}>
                <p className="mb-0">{message.text}</p>
                {message.links?.length ? (
                  <div className="agent-links">
                    {message.links.map((link) =>
                      link.external || link.href.startsWith("mailto:") || link.href.endsWith(".pdf") ? (
                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      ) : (
                        <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                          {link.label}
                        </Link>
                      ),
                    )}
                  </div>
                ) : null}
              </article>
            ))}
            {pending ? <p className="agent-typing">One moment…</p> : null}
          </div>
          <div className="agent-suggestions">
            {suggestions.map((item) => (
              <button key={item} type="button" onClick={() => ask(item)} disabled={pending}>
                {item}
              </button>
            ))}
          </div>
          <form
            className="agent-form"
            onSubmit={(event) => {
              event.preventDefault();
              void ask(draft);
            }}
          >
            <label className="visually-hidden" htmlFor="agent-question">
              Question
            </label>
            <input
              id="agent-question"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about projects, skills, or contact"
              maxLength={500}
            />
            <button type="submit" disabled={pending || draft.trim().length < 2}>
              Send
            </button>
          </form>
        </section>
      ) : null}
      <button type="button" className="agent-launch" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M5 16.5V7.8A2.8 2.8 0 0 1 7.8 5h8.4A2.8 2.8 0 0 1 19 7.8v5.4a2.8 2.8 0 0 1-2.8 2.8H9L5 19.5" />
        </svg>
        {open ? "Close" : "Ask"}
      </button>
    </div>
  );
}
