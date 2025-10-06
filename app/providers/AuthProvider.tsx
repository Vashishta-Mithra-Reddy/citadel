"use client";

import { getSession } from "@/actions/auth-actions";
import { SessionData } from "@/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext<{
  session: SessionData | null;
  refreshSession: () => Promise<void>;
}>({
  session: null,
  refreshSession: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);

  const refreshSession = useCallback(async () => {
    try {
      const s = await getSession();
      setSession(s);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  return (
    <AuthContext.Provider value={{ session, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
