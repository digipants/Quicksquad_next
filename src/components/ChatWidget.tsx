"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MessageCircle, Send, X } from "lucide-react";

type ChatLink = { label: string; href: string };
type ChatMessage = { role: "user" | "assistant"; content: string; links?: ChatLink[] };

const defaultPrompts = [
  "Which ResolveUS plan fits my needs?",
  "How do I start a consultation?",
  "Learn how to secure my email account",
  "How do refunds work?",
];

const devicePrompts = [
  "What devices can DashProtection help with?",
  "Are remote or on-site visits available?",
  "What do the device-care plans include?",
  "How do I request a device assessment?",
];

const welcome: ChatMessage = {
  role: "assistant",
  content: "Hi! I'm the ResolveUS AI guide. I can explain our services, plans, policies and how to contact the team. What can I help you with?",
};

export default function ChatWidget() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);
  const prompts = pathname === "/dashprotection" ? devicePrompts : defaultPrompts;

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, loading, open]);

  async function sendMessage(question?: string) {
    const text = (question ?? input).trim();
    if (!text || sendingRef.current) return;
    const current = { role: "user" as const, content: text.slice(0, 1200) };
    const history = messages.filter(msg => msg !== welcome).slice(-8).map(({ role, content }) => ({ role, content: content.slice(0, 1200) }));
    sendingRef.current = true;
    setLoading(true);
    setInput("");
    setMessages(previous => [...previous, current]);

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 22000);
      let response: Response;
      try {
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: current.content, history, page: pathname }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timer);
      }
      const payload = await response.json();
      if (!response.ok) throw new Error(typeof payload.error === "string" ? payload.error : "Please try again shortly.");
      if (typeof payload.reply !== "string" || !payload.reply.trim()) throw new Error("The AI guide couldn't prepare a response.");
      const links = Array.isArray(payload.links) ? payload.links.filter((link: unknown) => {
        if (!link || typeof link !== "object") return false;
        const candidate = link as Record<string, unknown>;
        return typeof candidate.label === "string" && typeof candidate.href === "string" && candidate.href.startsWith("/") && !candidate.href.startsWith("//");
      }).slice(0, 2) as ChatLink[] : [];
      setMessages(previous => [...previous, { role: "assistant", content: payload.reply, links }]);
    } catch (error) {
      const message = error instanceof Error && error.name !== "AbortError" ? error.message : "The AI guide is taking too long. Please try again.";
      setMessages(previous => [...previous, {
        role: "assistant",
        content: message + " You can also reach our team through the contact page.",
        links: [{ label: "Contact our team", href: "/contact#consultation-form" }],
      }]);
    } finally {
      sendingRef.current = false;
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void sendMessage();
    }
    if (event.key === "Escape") setOpen(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-label={open ? "Close ResolveUS AI guide" : "Chat with ResolveUS AI guide"}
        aria-expanded={open}
        aria-controls="resolveus-chat-panel"
        className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0C7974] text-white shadow-xl transition hover:bg-[#096761] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
      >
        {open ? <X size={23} aria-hidden="true" /> : <MessageCircle size={24} aria-hidden="true" />}
      </button>
      {open && (
        <section
          id="resolveus-chat-panel"
          role="dialog"
          aria-label="ResolveUS automated AI guide"
          className="fixed bottom-24 right-3 z-[70] flex h-[min(570px,calc(100dvh-7rem))] w-[min(390px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-2xl sm:right-5"
        >
          <header className="flex items-center justify-between gap-3 bg-[#091D35] px-4 py-3 text-white">
            <div>
              <h2 className="text-base font-bold">ResolveUS AI guide</h2>
              <p className="mt-0.5 text-xs text-teal-100">Automated answers · Not a live agent</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-lg p-2 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><X size={19} /></button>
          </header>
          <div role="log" aria-live="polite" aria-relevant="additions" className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#F6FAFA] px-4 py-4">
            {messages.map((message, index) => (
              <div key={index} className={"flex " + (message.role === "user" ? "justify-end" : "justify-start")}>
                <div className={"max-w-[93%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 shadow-sm " + (message.role === "user" ? "bg-[#0C7974] text-white" : "border border-slate-100 bg-white text-[#0B2540]")}>
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  {message.links && message.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.links.map(link => (
                        <a key={link.href} href={link.href} className="inline-flex items-center gap-1 rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-1.5 text-xs font-semibold text-[#096761] hover:bg-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">
                          {link.label}<ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
                {prompts.map(prompt => (
                  <button key={prompt} type="button" disabled={loading} onClick={() => void sendMessage(prompt)} className="rounded-full border border-teal-200 bg-white px-3 py-2 text-left text-xs font-medium text-[#0B2540] transition hover:border-[#0C7974] hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700">
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            {loading && <p role="status" className="text-sm text-slate-600">Preparing an answer…</p>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={event => { event.preventDefault(); void sendMessage(); }} className="border-t border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                maxLength={1200}
                onChange={event => setInput(event.target.value)}
                onKeyDown={onInputKeyDown}
                disabled={loading}
                placeholder="Ask about services, pricing, support…"
                aria-label="Ask ResolveUS AI guide"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#0B2540] placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7974]"
              />
              <button type="submit" disabled={loading || !input.trim()} aria-label="Send message" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0C7974] text-white hover:bg-[#096761] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 disabled:cursor-not-allowed disabled:opacity-50"><Send size={18} /></button>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-slate-500">
              Don&apos;t share passwords, one-time codes or card details. <a href="/privacy-policy" className="font-medium text-[#096761] underline">Privacy</a> · <a href="/contact#consultation-form" className="font-medium text-[#096761] underline">Talk to our team</a>
            </p>
          </form>
        </section>
      )}
    </div>
  );
}
