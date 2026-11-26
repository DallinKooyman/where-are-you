// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider, useAuthContext } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user, status } = useAuthContext();
  const { connected } = useSettingsContext();

  // Render a loading view here while the saved session is being checked.
  if (status) {
    return null;
  }

  return (
    <Stack>
      {/*Protected Stacks force the guard to be checked and be true) */}
      <Stack.Protected guard={!connected}>
        <Stack.Screen name="server" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!!connected && !user}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!!connected && !!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
function useSettingsContext(): { connected: any; } {
  throw new Error('Function not implemented.');
}

