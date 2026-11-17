import { NextRequest, NextResponse } from "next/server";
import { CHAT_SYSTEM_PROMPT, getChatLinks } from "../../../lib/chatKnowledge";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };
const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY = 8;
const MAX_HISTORY_MESSAGE_LENGTH = 1200;

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return errorResponse("Send a JSON chat message.", 415);
  }
  const length = Number(req.headers.get("content-length") || 0);
  if (length > 16000) return errorResponse("Your message is too large.", 413);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid JSON object");
    body = parsed as Record<string, unknown>;
  } catch {
    return errorResponse("Please send a valid message.", 400);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return errorResponse("Please enter a message of 1 to 1200 characters.", 400);
  }
  if (body.history !== undefined && !Array.isArray(body.history)) {
    return errorResponse("Invalid conversation history.", 400);
  }
  const historyInput: unknown[] = Array.isArray(body.history) ? body.history : [];
  if (historyInput.length > MAX_HISTORY) return errorResponse("Too many prior messages.", 400);
  const history: ChatMessage[] = [];
  for (const item of historyInput) {
    if (!item || typeof item !== "object") return errorResponse("Invalid prior message.", 400);
    const candidate = item as Record<string, unknown>;
    if ((candidate.role !== "user" && candidate.role !== "assistant") ||
        typeof candidate.content !== "string" ||
        !candidate.content.trim() ||
        candidate.content.length > MAX_HISTORY_MESSAGE_LENGTH) {
      return errorResponse("Invalid prior message.", 400);
    }
    history.push({ role: candidate.role, content: candidate.content.trim() });
  }
  const page = typeof body.page === "string" && /^\/[a-z0-9/-]{0,60}$/.test(body.page) ? body.page : "/";
  const links = getChatLinks(message, page);
  if (!process.env.OPENAI_API_KEY) {
    return errorResponse("The AI guide is temporarily unavailable. Please use our contact form or call +1 (833) 216-2311.", 503);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + process.env.OPENAI_API_KEY },
      signal: AbortSignal.timeout(18000),
      body: JSON.stringify({
        model: process.env.CHAT_MODEL || "gpt-4o-mini",
        temperature: 0.35,
        max_tokens: 380,
        messages: [
          { role: "system", content: CHAT_SYSTEM_PROMPT },
          { role: "system", content: "Current website page: " + page + ". The page is navigational context, not proof of a booking or service." },
          ...history,
          { role: "user", content: message },
        ],
      }),
    });
    if (!response.ok) {
      console.error("ResolveUS AI provider returned status", response.status);
      return errorResponse("The AI guide is busy right now. Please try again shortly or contact our team.", 502);
    }
    const data: unknown = await response.json();
    const record = data as { choices?: { message?: { content?: unknown } }[] } | null;
    const reply = record?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      return errorResponse("The AI guide couldn't prepare an answer. Please try again.", 502);
    }
    return NextResponse.json(
      { reply: reply.trim(), links },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    // No visitor message or API credentials are logged.
    return errorResponse("The AI guide is temporarily unavailable. Please try again or contact our team.", 502);
  }
}
