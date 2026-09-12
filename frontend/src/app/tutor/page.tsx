"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Send, Sparkles, ArrowLeft, BookOpen, CheckCircle2, HelpCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const exampleQuestions = [
  "What is offside?",
  "What is a False 9?",
  "Explain Gegenpressing",
];

interface Source {
  title: string;
  type: string;
  slug: string;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  mode?: "beginner" | "intermediate" | "advanced";
  sources?: Source[];
}

interface ParsedSection {
  title: string;
  content: string;
  type: "short_answer" | "detailed_explanation" | "real_example" | "related_concepts" | "general";
}

const modes = [
  {
    id: "beginner",
    name: "Beginner",
    icon: "🌱",
    description: "Simple analogies & terms",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    icon: "📋",
    description: "Standard tactical terms & examples",
  },
  {
    id: "advanced",
    name: "Advanced",
    icon: "🧠",
    description: "Deep tactical spacing & strategies",
  },
] as const;

function TutorContent() {
  const [inputValue, setInputValue] = useState("");
  const [mode, setMode] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const searchParams = useSearchParams();
  const initialQueryRef = useRef(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I'm your AI Football Tutor. Ask me any football question, like rules, tactical setups, player roles, or soccer histories. I'll explain it in a way that's easy to understand!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: `Hello! I'm your AI Football Tutor. Let's restart our chat. I am currently explanation level: **${mode.toUpperCase()}**. Ask me any football question, and I'll explain it accordingly!`,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
      mode: mode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    let envUrl = (process.env.NEXT_PUBLIC_API_URL || "").trim().replace(/\/+$/, "");
    if (!envUrl) {
      envUrl = "https://learnfootball-backend.onrender.com/api/v1";
    } else if (!envUrl.includes("/api/v1")) {
      envUrl = `${envUrl}/api/v1`;
    }
    const apiBase = envUrl;

    try {
      const response = await fetch(`${apiBase}/tutor/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          mode: mode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: status ${response.status}`);
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: data.ai_response,
          timestamp: new Date(),
          mode: mode,
          sources: data.sources,
        },
      ]);
    } catch (err: any) {
      console.error("AI Tutor API fetch error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: `⚠️ **Backend Unreachable** (${err?.message || "Network Error"})\n\nThe LearnFootball backend is currently starting up or unreachable. Please wait a few seconds (Render free instances spin up on request) and try again.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (mounted && !initialQueryRef.current) {
      const q = searchParams.get("q");
      if (q) {
        initialQueryRef.current = true;
        handleSend(q);
      }
    }
  }, [mounted, searchParams]);

  // Helper parser for markdown sections returned by AI Tutor
  const parseBotResponse = (text: string): ParsedSection[] => {
    const sections: ParsedSection[] = [];
    const markers = [
      { key: "### Short Answer", type: "short_answer", title: "Short Answer" },
      { key: "### Detailed Explanation", type: "detailed_explanation", title: "Detailed Explanation" },
      { key: "### Real Football Example", type: "real_example", title: "Real Football Example" },
      { key: "### Related Concepts", type: "related_concepts", title: "Related Concepts" },
    ] as const;

    const lowerText = text.toLowerCase();
    const hasMarkers = markers.some((m) => lowerText.includes(m.key.toLowerCase()));

    if (!hasMarkers) {
      return [{ title: "", content: text, type: "general" }];
    }

    const found: { index: number; key: string; type: typeof markers[number]["type"]; title: string }[] = [];

    markers.forEach((m) => {
      const idx = lowerText.indexOf(m.key.toLowerCase());
      if (idx !== -1) {
        found.push({ index: idx, key: m.key, type: m.type, title: m.title });
      }
    });

    // Sort by position in text
    found.sort((a, b) => a.index - b.index);

    // Grab any introductory text before first marker
    if (found.length > 0 && found[0].index > 0) {
      const preText = text.substring(0, found[0].index).trim();
      if (preText) {
        sections.push({ title: "", content: preText, type: "general" });
      }
    }

    for (let i = 0; i < found.length; i++) {
      const current = found[i];
      const next = found[i + 1];
      const startIdx = current.index + current.key.length;
      const endIdx = next ? next.index : text.length;
      const content = text.substring(startIdx, endIdx).trim();

      sections.push({
        title: current.title,
        content,
        type: current.type,
      });
    }

    return sections;
  };

  // Content formatting renderer
  const renderSectionContent = (content: string, type: string, onSuggestClick?: (term: string) => void) => {
    if (type === "related_concepts") {
      const lines = content.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
      const suggestions: string[] = [];

      lines.forEach((line) => {
        const cleaned = line.replace(/^[\*\-\d\.\s]+/, "").trim();
        if (cleaned) {
          suggestions.push(cleaned);
        }
      });

      if (suggestions.length === 0) return null;

      return (
        <div className="mt-2.5 flex flex-wrap gap-2 animate-fade-in stagger-2">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSuggestClick?.(s)}
              className="flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-light/50 dark:bg-accent-light/10 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent hover:text-foreground-inverse transition-all cursor-pointer shadow-sm"
            >
              💬 {s}
            </button>
          ))}
        </div>
      );
    }

    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="my-2 list-disc space-y-1 pl-5 text-xs sm:text-sm text-foreground-secondary">
            {listItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        inList = true;
        listItems.push(trimmed.substring(2).replace(/^\*\*/, "").replace(/\*\*$/, "")); // Strip bold markers if wrapping list item
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushList(index);
        inList = false;
        elements.push(
          <p key={index} className="my-1 pl-2 text-xs sm:text-sm text-foreground-secondary font-medium">
            {trimmed}
          </p>
        );
      } else if (trimmed === "") {
        flushList(index);
        inList = false;
      } else {
        flushList(index);
        inList = false;
        // Basic bold formatting parser
        const boldRegex = /\*\*(.*?)\*\*/g;
        let formattedText: React.ReactNode = trimmed;
        if (boldRegex.test(trimmed)) {
          const parts = trimmed.split(boldRegex);
          formattedText = parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-foreground">{part}</strong> : part));
        }

        elements.push(
          <p key={index} className="mb-2 text-xs sm:text-sm leading-relaxed text-foreground-secondary last:mb-0">
            {formattedText}
          </p>
        );
      }
    });

    flushList(lines.length);

    return <div className="space-y-1">{elements}</div>;
  };

  return (
    <section className="flex min-h-[calc(100vh-64px)] flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border-light bg-background-secondary/50 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-lg p-2 text-foreground-muted hover:bg-background-secondary hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-xl dark:bg-accent-light/10">
              🤖
            </div>
            <div>
              <h1 className="text-sm font-bold sm:text-base">AI Football Tutor</h1>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Active Tutor Mode
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearChat}
              title="Clear conversation history"
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background-card px-2.5 py-1.5 text-xs font-semibold text-foreground-muted hover:bg-error-light hover:text-error hover:border-error/20 transition-all cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <div className="hidden items-center gap-1.5 text-xs text-foreground-muted sm:flex">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              Gemini 2.5 Flash
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selector Header Bar */}
      <div className="border-b border-border-light bg-background-card/90 backdrop-blur-md px-4 py-2 sm:py-3 sm:px-6 shadow-sm z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted">Explanation Level</span>
            <span className="text-xs text-foreground-secondary">Toggle complexity of tactical details:</span>
          </div>
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-background-secondary p-1 w-full sm:w-auto">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  mode === m.id
                    ? "bg-background-card shadow-sm text-foreground ring-1 ring-border-light font-bold"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-card/50"
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Welcome Intro */}
          {messages.length === 1 && (
            <div className="mx-auto max-w-md text-center py-10 animate-fade-in-up">
              <span className="mb-4 inline-block text-6xl animate-float">🤖</span>
              <h2 className="text-xl font-bold sm:text-2xl">Meet your Tactical Mentor</h2>
              <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
                Choose an explanation level above and ask questions!
                You can try beginner explanations or dive deep into advanced tactics.
              </p>
            </div>
          )}

          {/* Example Prompts (shown initially) */}
          {messages.length === 1 && (
            <div className="space-y-3 animate-fade-in-up stagger-2">
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                Try asking one of these:
              </p>
              <div className="flex flex-col items-center justify-center gap-2.5 sm:flex-row">
                {exampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="card w-full cursor-pointer border-border-light bg-background-card px-4 py-3 text-center text-xs font-semibold text-foreground-secondary hover:border-accent hover:bg-accent-light/50 dark:hover:bg-accent-light/10 sm:w-auto"
                  >
                    💬 {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Flow */}
          <div className="space-y-6">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? "justify-end animate-slide-in-right" : "justify-start animate-slide-in-left"}`}
                >
                  {!isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-light text-xs dark:bg-accent-light/10 select-none">
                      🤖
                    </div>
                  )}
                  <div
                    className={`card w-full max-w-[90%] px-4 py-3.5 text-sm sm:max-w-[80%] ${
                      isUser
                        ? "bg-accent text-foreground-inverse rounded-tr-none shadow-md dark:bg-accent/80 hover:translate-y-0"
                        : "bg-background-card rounded-tl-none border-border-light dark:bg-background-card/90 hover:translate-y-0 shadow-sm"
                    }`}
                  >
                    {isUser ? (
                      <div>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        {msg.mode && (
                          <span className="mt-1 inline-flex items-center gap-1 rounded bg-background-secondary/30 px-1.5 py-0.5 text-[9px] font-semibold text-foreground-inverse/90">
                            Level: {msg.mode.toUpperCase()}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {parseBotResponse(msg.text).map((section, sIdx) => {
                          if (section.type === "short_answer") {
                            return (
                              <div key={sIdx} className="rounded-xl border border-accent/20 bg-accent-light/20 dark:bg-accent-light/5 p-3.5">
                                <div className="mb-1.5 flex items-center gap-2 font-bold text-accent text-xs uppercase tracking-wider">
                                  <HelpCircle className="h-3.5 w-3.5 text-accent" />
                                  Quick Summary
                                </div>
                                {renderSectionContent(section.content, section.type)}
                              </div>
                            );
                          }
                          if (section.type === "detailed_explanation") {
                            return (
                              <div key={sIdx} className="space-y-2">
                                <div className="font-bold text-foreground text-xs uppercase tracking-wider opacity-60">
                                  📖 Detailed Explanation
                                </div>
                                <div className="bg-background-secondary/20 dark:bg-background-secondary/10 rounded-xl p-3 sm:p-4 border border-border-light/20">
                                  {renderSectionContent(section.content, section.type)}
                                </div>
                              </div>
                            );
                          }
                          if (section.type === "real_example") {
                            return (
                              <div key={sIdx} className="rounded-xl border border-info/20 bg-info-light/20 dark:bg-info-light/5 p-3.5">
                                <div className="mb-1.5 flex items-center gap-2 font-bold text-info text-xs uppercase tracking-wider">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-info" />
                                  Real Football Example
                                </div>
                                {renderSectionContent(section.content, section.type)}
                              </div>
                            );
                          }
                          if (section.type === "related_concepts") {
                            return (
                              <div key={sIdx} className="pt-2 border-t border-border-light/40">
                                <div className="font-bold text-foreground text-xs uppercase tracking-wider opacity-60 mb-1">
                                  🧠 Explore Next
                                </div>
                                {renderSectionContent(section.content, section.type, handleSend)}
                              </div>
                            );
                          }
                          return (
                            <div key={sIdx}>
                              {renderSectionContent(section.content, section.type)}
                            </div>
                          );
                        })}

                        {/* Source Links */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border-light flex flex-wrap items-center gap-1.5 text-xs text-foreground-muted">
                            <span className="font-bold text-[10px] uppercase tracking-wider opacity-70">Curriculum References:</span>
                            {msg.sources.map((src, sIdx) => (
                              <Link
                                key={sIdx}
                                href={`/academy/${src.type}/${src.slug}`}
                                className="inline-flex items-center gap-1 rounded-full bg-background-secondary/50 dark:bg-background-secondary hover:bg-accent hover:text-foreground-inverse hover:border-accent border border-border px-2.5 py-0.5 font-semibold transition-all"
                              >
                                <BookOpen className="h-3 w-3" />
                                {src.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    <span className="mt-2 block text-[9px] text-foreground-muted opacity-60 text-right select-none">
                      {mounted ? msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start animate-slide-in-left">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-light text-xs dark:bg-accent-light/10 select-none">
                  🤖
                </div>
                <div className="card rounded-tl-none bg-background-card py-3.5 px-5 border-border-light shadow-sm">
                  <div className="flex items-center gap-1 py-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-border-light bg-background-secondary/30 px-4 py-4 sm:px-6 dark:bg-background-secondary/10 shadow-inner">
        <div className="mx-auto max-w-4xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="flex flex-1 items-center gap-3 rounded-full border border-border bg-background-card px-4 py-2.5 transition-all focus-within:border-accent focus-within:ring-1 focus-within:ring-accent dark:border-border/60 sm:px-5 sm:py-3.5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Ask any question in ${mode} mode...`}
                className="flex-1 bg-transparent text-xs sm:text-sm outline-none placeholder:text-foreground-muted text-foreground"
              />
            </div>
            <button
              type="submit"
              className="btn-primary rounded-full p-2.5 sm:p-4 shrink-0 shadow-md green-glow"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-[10px] text-foreground-muted">
            Tutor Mode: {mode.toUpperCase()} — responses generated by Gemini API
          </p>
        </div>
      </div>
    </section>
  );
}

export default function TutorPage() {
  return (
    <Suspense fallback={
      <section className="flex min-h-[calc(100vh-64px)] flex-col bg-background items-center justify-center">
        <div className="text-foreground-muted animate-pulse">Loading Tactical Mentor...</div>
      </section>
    }>
      <TutorContent />
    </Suspense>
  );
}

