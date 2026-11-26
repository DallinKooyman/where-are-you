// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { canReachServer } from "@/api/server";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { settingsStore } from "./settingsStore";

interface SettingsContextValue {
  serverAddress: string | undefined;
  connected: boolean;
  updateServerAddress: (address: string) => Promise<boolean>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [serverAddress, setServerAddress] = useState<string | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false);

  const updateServerAddress = useCallback(async (address: string): Promise<boolean> => {
    try {
      if (await canReachServer(address)) {
        setServerAddress(address);
        setConnected(true);
        settingsStore.setState({ serverAddress })
        return true;
      }
      else {
        return false;
      }
    }
    catch (err) {
      // For now we will disconnect the user from any server they were connected to on error.
      // Future implementations should have a previously connected list to revert back to.
      setServerAddress(undefined);
      setConnected(false);
      console.error(err)
      return false;
    }
  }, [])


  return (
    <SettingsContext.Provider value={{ serverAddress, connected, updateServerAddress }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettingsContext(): SettingsContextValue {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettingsContext must be used within a SettingsProvider");
  }

  return context;
}