"use client";

import { useState, useMemo } from "react";
import { Search, X, MessageSquare, BookOpen, ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";
import { glossaryTerms, type GlossaryTerm } from "@/data/academy/glossaryData";

const categoryColors: Record<string, string> = {
  Position: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/5 dark:text-blue-400 dark:border-blue-500/10",
  Role: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/5 dark:text-purple-400 dark:border-purple-500/10",
  Tactic: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/5 dark:text-amber-400 dark:border-amber-500/10",
  Style: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-400 dark:border-emerald-500/10",
  Stat: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-500/5 dark:text-rose-400 dark:border-rose-500/10",
};

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  // Filter terms by search query and category
  const filteredTerms = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();
    return glossaryTerms.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(cleanSearch) ||
        item.shortDefinition.toLowerCase().includes(cleanSearch);
      
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);


  // Group terms alphabetically
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((item) => {
      const firstLetter = item.term.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(item);
    });

    // Sort terms within each group
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => a.term.localeCompare(b.term));
    });

    return groups;
  }, [filteredTerms]);

  // Sorted list of letters that have matching terms
  const activeLetters = useMemo(() => {
    return Object.keys(groupedTerms).sort();
  }, [groupedTerms]);

  // Handle smooth scroll to alphabetical headers
  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`group-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-background min-h-screen px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center animate-fade-in-up">
          <span className="mb-4 inline-block text-6xl animate-float">📖</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Football{" "}
            <span className="bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
              Glossary
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted">
            Explore {glossaryTerms.length} essential football terms explained clearly. Filter by category, search instantly, or ask the AI Sensei to explain any concept!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-xl animate-fade-in-up stagger-2">
          <div className="flex items-center gap-3 rounded-full border border-border bg-background-card px-5 py-3.5 focus-within:border-accent transition-all shadow-sm">
            <Search className="h-5 w-5 shrink-0 text-foreground-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search terms, definitions, and concepts..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground-muted text-foreground"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="rounded-full p-1 hover:bg-background-secondary text-foreground-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 animate-fade-in-up stagger-3">
          {["All", "Position", "Role", "Tactic", "Style", "Stat"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer rounded-full border px-4.5 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-[var(--duration-fast)] shadow-sm ${
                selectedCategory === cat
                  ? "border-accent bg-accent text-foreground-inverse"
                  : "border-border bg-background-card text-foreground-muted hover:border-accent hover:text-accent dark:border-border/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Alphabetical quick navigation */}
        {activeLetters.length > 1 && (
          <div className="mx-auto mb-10 max-w-4xl rounded-2xl border border-border bg-background-card/50 px-4 py-3 shadow-inner dark:bg-background-card/10 animate-fade-in stagger-3">
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm font-bold text-foreground-muted">
              <span className="text-[10px] uppercase tracking-wider font-semibold mr-2">Jump to:</span>
              {activeLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => scrollToLetter(letter)}
                  className="h-8 w-8 rounded-lg hover:bg-accent-light hover:text-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer flex items-center justify-center text-xs dark:hover:bg-accent-light/10"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Terms Grouped Grid */}
        <div className="mx-auto max-w-5xl space-y-12">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 max-w-md mx-auto card border-dashed animate-scale-in">
              <span className="text-4xl">🤷‍♂️</span>
              <h3 className="mt-4 text-lg font-bold">No terms found</h3>
              <p className="mt-2 text-xs sm:text-sm text-foreground-muted leading-relaxed">
                We couldn&apos;t find any terms matching &quot;{searchTerm}&quot; in the &quot;{selectedCategory}&quot; category. Try clearing your search filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="btn-primary mt-5 px-6 py-2 text-xs"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            activeLetters.map((letter) => (
              <div key={letter} id={`group-${letter}`} className="scroll-mt-6 space-y-4 animate-fade-in">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-accent border-b-2 border-accent pb-1 w-10 text-center select-none bg-accent-light/50 dark:bg-accent-light/10 rounded-lg">
                    {letter}
                  </h2>
                  <div className="flex-1 h-[1px] bg-border-light" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {groupedTerms[letter].map((item) => (
                    <div
                      key={item.slug}
                      onClick={() => setSelectedTerm(item)}
                      className="card group cursor-pointer p-5 flex flex-col justify-between transition-all duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-accent hover:shadow-md bg-background-card"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryColors[item.category]}`}
                          >
                            {item.category}
                          </span>
                          <span className="text-[10px] text-foreground-muted font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-accent">
                            View details
                            <ExternalLink className="h-3 w-3" />
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                          {item.term}
                        </h3>
                        <p className="mt-1.5 text-xs text-foreground-muted leading-relaxed line-clamp-2">
                          {item.shortDefinition}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Details Modal Overlay */}
      {selectedTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm animate-fade-in">
          {/* Modal Backdrop Click Handler */}
          <div className="absolute inset-0 cursor-default" onClick={() => setSelectedTerm(null)} />

          {/* Modal Card */}
          <div className="card max-w-lg w-full bg-background-card border-border shadow-elevated p-6 sm:p-7 relative z-10 animate-scale-in max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedTerm(null)}
              className="absolute top-4 right-4 rounded-full p-2 text-foreground-muted hover:bg-background-secondary hover:text-foreground transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header info */}
            <div className="mb-4">
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-2.5 ${categoryColors[selectedTerm.category]}`}
              >
                {selectedTerm.category}
              </span>
              <h2 className="text-2xl font-bold text-foreground leading-tight">
                {selectedTerm.term}
              </h2>
            </div>

            {/* Definition */}
            <div className="space-y-4">
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground-muted mb-1.5">Definition</h4>
                <p className="text-sm leading-relaxed text-foreground-secondary bg-background-secondary/30 dark:bg-background-secondary/15 rounded-xl p-4 border border-border-light/10">
                  {selectedTerm.definition}
                </p>
              </div>

              {/* Real World Example */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground-muted mb-1.5">Real Football Example</h4>
                <div className="flex gap-3 rounded-xl border border-info/20 bg-info-light/20 dark:bg-info-light/5 p-4 text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                  <div className="text-base select-none shrink-0">⚽</div>
                  <p>{selectedTerm.example}</p>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-7 pt-4 border-t border-border-light flex flex-col gap-2">
              <Link
                href={`/sensei?q=Explain+the+concept+of+${encodeURIComponent(selectedTerm.term)}`}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 green-glow text-sm"
              >
                <MessageSquare className="h-4 w-4" />
                Ask Tactical Mentor about this
              </Link>
              <button
                onClick={() => setSelectedTerm(null)}
                className="btn-secondary w-full py-3 text-sm"
              >
                Close Definition
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

