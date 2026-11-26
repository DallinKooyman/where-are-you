// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { useSettingsContext } from "@/context/SettingsContext";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaFrameContext, SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Connect() {
  const [serverAddress, onServerAddressChange] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);

  const serverAddressMissing = submitted && serverAddress.trim() === '';

  const { updateServerAddress } = useSettingsContext();

  function handleSubmission() {
    setSubmitted(true);

    if (serverAddressMissing) {
      return; // Keep the user on the form until a server address is filled
    }

    if (!updateServerAddress(serverAddress)) {
      setFailedConnection(true);
    };
  }

  return (
    <SafeAreaProvider>
      <SafeAreaFrameContext value={null}>
        <SafeAreaView>
          <TextInput
            style={[styles.input, serverAddressMissing && styles.inputError]}
            onChangeText={onServerAddressChange}
            value={serverAddress}
            placeholder="Server Address"
          />
          {serverAddressMissing && (
            <Text style={styles.errorText}>Server address is required.</Text>
          )}

          {failedConnection && (
            < Text style={styles.errorText}>Unable to connect to server.</Text>
          )}

          {/* Pressable is more controllable, can switch to button later */}
          <Pressable
            onPress={handleSubmission}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Connect</Text>
          </Pressable>

        </SafeAreaView>
      </SafeAreaFrameContext>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  container: {
    gap: 8,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 4,
  },

});
