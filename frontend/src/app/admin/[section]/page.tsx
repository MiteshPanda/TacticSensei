"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL ?? "https://learnfootball-backend.onrender.com/api/v1";

interface Entry {
  id: string;
  [key: string]: unknown;
}

// Section display configuration
const SECTION_CONFIG: Record<string, { label: string; emoji: string; displayKeys: string[] }> = {
  glossary: { label: "Glossary", emoji: "📖", displayKeys: ["term", "category", "definition"] },
  players: { label: "Players", emoji: "👤", displayKeys: ["name", "nationality", "position"] },
  teams: { label: "Teams", emoji: "🏟️", displayKeys: ["name", "country"] },
  coaches: { label: "Coaches", emoji: "🧑‍🏫", displayKeys: ["name", "nationality"] },
  lessons: { label: "Lessons", emoji: "📚", displayKeys: ["title", "category", "difficulty"] },
  quizzes: { label: "Quizzes", emoji: "🧩", displayKeys: ["title", "description"] },
  users: { label: "Users", emoji: "👥", displayKeys: ["display_name", "email", "role"] },
};

const PAGE_SIZE = 20;

export default function AdminSectionPage() {
  const params = useParams<{ section: string }>();
  const section = params.section;
  const router = useRouter();
  const { user, session, loading } = useAuth();

  const role: string = (user?.app_metadata?.role as string) ?? "user";
  const isAdmin = role === "admin" || role === "super_admin";

  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  const cfg = SECTION_CONFIG[section] ?? { label: section, emoji: "📋", displayKeys: [] };

  // Auth guard
  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
    if (!loading && user && !isAdmin) router.replace("/");
  }, [loading, user, isAdmin, router]);

  const fetchEntries = useCallback(async () => {
    if (!session?.access_token) return;
    setDataLoading(true);
    try {
      const res = await fetch(
        `${API}/admin/content/${section}?limit=${PAGE_SIZE}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${session.access_token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setEntries(data.data ?? []);
        setTotal(data.total ?? 0);
      }
    } finally {
      setDataLoading(false);
    }
  }, [section, offset, session]);

  useEffect(() => {
    if (isAdmin) fetchEntries();
  }, [isAdmin, fetchEntries]);

  const handleDelete = async (id: string) => {
    if (!session?.access_token) return;
    setDeleting(true);
    const endpointMap: Record<string, string> = {
      glossary: "glossary",
      players: "player",
      teams: "team",
      lessons: "lesson",
    };
    const ep = endpointMap[section];
    if (!ep) { setDeleting(false); setDeleteTarget(null); return; }

    await fetch(`${API}/admin/${ep}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    setDeleting(false);
    setDeleteTarget(null);
    fetchEntries();
  };

  const filteredEntries = entries.filter((e) =>
    search
      ? cfg.displayKeys.some((k) =>
          String(e[k] ?? "").toLowerCase().includes(search.toLowerCase())
        )
      : true
  );

  if (loading || !user || !isAdmin) {
    return (
      <section className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-foreground-muted animate-float text-4xl">⚙️</div>
      </section>
    );
  }

  return (
    <section className="bg-background px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-6 animate-fade-in">
          <Link href="/admin" className="text-sm text-foreground-muted hover:text-accent transition-colors">
            ← Admin Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{cfg.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold">{cfg.label}</h1>
              <p className="text-foreground-muted text-sm">{total} entries total</p>
            </div>
          </div>
          {/* Search */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-border bg-background-secondary px-4 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 w-52"
            />
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden p-0 animate-fade-in-up stagger-1">
          {dataLoading ? (
            <div className="p-10 text-center text-foreground-muted animate-float">
              Loading…
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="p-10 text-center text-foreground-muted">
              {search ? "No entries match your search." : "No entries found. Connect Supabase to see live data."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background-secondary text-foreground-muted border-b border-border">
                  <tr>
                    {cfg.displayKeys.map((k) => (
                      <th key={k} className="text-left px-5 py-3 font-semibold capitalize">
                        {k.replace(/_/g, " ")}
                      </th>
                    ))}
                    <th className="px-5 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry, i) => (
                    <tr
                      key={entry.id}
                      className={`border-t border-border-light transition-colors hover:bg-accent/5 ${i % 2 === 0 ? "bg-background-card" : "bg-background-secondary"}`}
                    >
                      {cfg.displayKeys.map((k) => (
                        <td key={k} className="px-5 py-3 max-w-xs truncate text-foreground-muted">
                          {String(entry[k] ?? "—")}
                        </td>
                      ))}
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="text-xs font-semibold text-foreground-muted hover:text-accent border border-border rounded-lg px-3 py-1 transition-colors"
                            title="Edit (coming soon)"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(entry.id)}
                            className="text-xs font-semibold text-error hover:bg-error/10 border border-error/30 rounded-lg px-3 py-1 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {total > PAGE_SIZE && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-foreground-muted">
              Showing {offset + 1}–{Math.min(offset + PAGE_SIZE, total)} of {total}
            </p>
            <div className="flex gap-2">
              <button
                disabled={offset === 0}
                onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
                className="btn-secondary text-sm px-4 py-2 disabled:opacity-40"
              >
                ← Prev
              </button>
              <button
                disabled={offset + PAGE_SIZE >= total}
                onClick={() => setOffset(offset + PAGE_SIZE)}
                className="btn-secondary text-sm px-4 py-2 disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="card max-w-sm w-full mx-4 p-8 text-center animate-scale-in">
            <span className="text-4xl block mb-4">⚠️</span>
            <h3 className="text-xl font-bold mb-2">Delete Entry?</h3>
            <p className="text-foreground-muted text-sm mb-6">
              This action cannot be undone. The entry will be permanently removed from the database.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="btn-secondary flex-1"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                disabled={deleting}
                className="flex-1 rounded-xl bg-error px-4 py-2.5 text-sm font-semibold text-white hover:bg-error/90 disabled:opacity-50 transition-colors"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
