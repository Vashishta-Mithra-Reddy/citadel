"use client";

import { authClient } from "@/lib/auth-client";
import { SessionData } from "@/types";
import {
  createContext,
  useContext,
} from "react";

const AuthContext = createContext<{
  session: SessionData | null;
  refreshSession: () => void;
}>({
  session: null,
  refreshSession: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, refetch } = authClient.useSession();

  return (
    <AuthContext.Provider value={{ session, refreshSession: refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
