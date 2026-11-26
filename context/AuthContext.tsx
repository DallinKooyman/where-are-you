// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { createUser, login } from "@/api/user";
import { User } from "@/models/user";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

type AuthStatus = "loading" | "signedOut" | "signedIn";

interface AuthContextValue {
  user: User | undefined;
  status: AuthStatus;
  signIn: (email: string, password?: string) => Promise<boolean>;
  signUp: (email: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let isActive = true;

    async function restoreSession() {
      try {
        const restoredUser = new User('123', "test"); //TODO: Update later with session stored one device

        if (isActive) {
          setUser(restoredUser);
          setStatus(restoredUser ? "signedIn" : "signedOut");
        }
      }
      catch (err) {
        console.error(err);
        if (isActive) {
          setUser(undefined);
          setStatus("signedOut");
        }
      }
    }

    restoreSession();

    return () => {
      isActive = false;
    };
  });

  const signIn = useCallback(async (email: string, password?: string): Promise<boolean> => {
    try {
      const signedInUser = await login(email, password);
      setUser(signedInUser);
      setStatus("signedIn");
      return true;
    }
    catch (err) {
      console.error(err);
      removeUser();
      return false;
    }
  }, []);

  const signUp = useCallback(async (name: string, password?: string) => {
    try {
      const newUser = await createUser(name, password);
      setUser(newUser);
      setStatus("signedIn");
    }
    catch (err) {
      console.error(err);
      removeUser();
    }
  }, []);

  const signOut = useCallback(async () => {
    //TODO once there is an actual auth service, log people out
  }, []);

  function removeUser() {
    setUser(undefined);
    setStatus("signedOut");
  }

  return (
    <AuthContext.Provider value={{ user, status, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}