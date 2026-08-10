"use client";

import React, { createContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { AuthState, AuthUser } from "@/lib/auth";

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // On mount, check if we have a valid session (ping /api/auth/me)
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => setIsLoaded(true));
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = res.ok ? await res.json() : null;
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    window.location.href = "/";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoaded,
        isSignedIn: !!user,
        user,
        refresh,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
