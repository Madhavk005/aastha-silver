"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type AuthState = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: AuthUser | null;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
