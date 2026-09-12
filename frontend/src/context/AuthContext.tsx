"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase, type User, type Session } from "@/lib/supabase";

// ─── Types ─────────────────────────────────────────────────────────────────

interface Favorite {
  id: string;
  item_type: "player" | "team";
  item_id: string;
  item_name: string | null;
}

interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: UserProfile | null;
  profileLoading: boolean;
  favorites: Favorite[];
  favoritesLoading: boolean;
  /** Sign in with email + password */
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  /** Sign up with email + password */
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: string | null }>;
  /** Sign in with Google OAuth (redirects) */
  signInWithGoogle: () => Promise<void>;
  /** Sign out */
  signOut: () => Promise<void>;
  /** Toggle a favorite — adds if absent, removes if present */
  toggleFavorite: (itemType: "player" | "team", itemId: string, itemName: string) => Promise<void>;
  /** Check if an item is already favorited */
  isFavorited: (itemType: "player" | "team", itemId: string) => boolean;
  /** Reload favorites from the backend */
  refreshFavorites: () => Promise<void>;
  /** Reload user profile from the backend */
  refreshProfile: () => Promise<void>;
}

// ─── Context ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ───────────────────────────────────────────────────────────────

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  // ── Profile helpers ────────────────────────────────────────────────────

  const fetchProfile = useCallback(async (accessToken: string) => {
    setProfileLoading(true);
    try {
      const res = await fetch(`${API}/users/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch {
      // silently ignore network errors
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session?.access_token) {
      await fetchProfile(session.access_token);
    }
  }, [session, fetchProfile]);

  // ── Favorites helpers ──────────────────────────────────────────────────

  const fetchFavorites = useCallback(async (accessToken: string) => {
    setFavoritesLoading(true);
    try {
      const res = await fetch(`${API}/favorites/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.favorites ?? []);
      }
    } catch {
      // silently ignore network errors
    } finally {
      setFavoritesLoading(false);
    }
  }, []);

  const refreshFavorites = useCallback(async () => {
    if (session?.access_token) {
      await fetchFavorites(session.access_token);
    }
  }, [session, fetchFavorites]);

  const isFavorited = useCallback(
    (itemType: "player" | "team", itemId: string) =>
      favorites.some((f) => f.item_type === itemType && f.item_id === itemId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (itemType: "player" | "team", itemId: string, itemName: string) => {
      if (!session?.access_token) return;
      const headers = {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      };

      const alreadyFav = isFavorited(itemType, itemId);

      if (alreadyFav) {
        await fetch(`${API}/favorites/by-item`, {
          method: "DELETE",
          headers,
          body: JSON.stringify({ item_type: itemType, item_id: itemId }),
        });
        setFavorites((prev) =>
          prev.filter((f) => !(f.item_type === itemType && f.item_id === itemId))
        );
      } else {
        const res = await fetch(`${API}/favorites/`, {
          method: "POST",
          headers,
          body: JSON.stringify({ item_type: itemType, item_id: itemId, item_name: itemName }),
        });
        if (res.ok) {
          const newFav = await res.json();
          setFavorites((prev) => [newFav, ...prev]);
        }
      }
    },
    [session, isFavorited]
  );

  // ── Auth operations ────────────────────────────────────────────────────

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName?: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: displayName } },
      });
      return { error: error?.message ?? null };
    },
    []
  );

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/profile` },
    });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setFavorites([]);
    setProfile(null);
  }, []);

  // ── Session listener ───────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.access_token) {
        fetchFavorites(session.access_token);
        fetchProfile(session.access_token);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.access_token) {
          fetchFavorites(newSession.access_token);
          fetchProfile(newSession.access_token);
        } else {
          setFavorites([]);
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchFavorites, fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        profile,
        profileLoading,
        favorites,
        favoritesLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        toggleFavorite,
        isFavorited,
        refreshFavorites,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
