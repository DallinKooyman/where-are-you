// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from 'react';
import { SafeAreaFrameContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '@/context/AuthContext';
import { router } from 'expo-router';

export default function Login() {
  const [name, onNameChange] = useState('');
  const [password, onPasswordChange] = useState<string | undefined>(); //Passwords are optional
  const [submitted, setSubmitted] = useState(false);
  const [failedSignIn, setFailedSignIn] = useState(false);

  const nameMissing = submitted && name.trim() === '';

  const { signIn } = useAuthContext();

  function handleLogin() {
    setSubmitted(true);

    if (nameMissing) {
      return; // Keep the user on the form until a name is filled
    }

    if (!signIn(name, password)) {
      setFailedSignIn(true);
    };
  }

  return (
    <SafeAreaProvider>
      <SafeAreaFrameContext value={null}>
        <SafeAreaView>
          <TextInput
            style={[styles.input, nameMissing && styles.inputError]}
            onChangeText={onNameChange}
            value={name}
            placeholder="Username"
          />
          {nameMissing && (
            <Text style={styles.errorText}>Username is required.</Text>
          )}

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={onPasswordChange}
            value={password}
            placeholder="Password"
          />

          {failedSignIn && (
            < Text style={styles.errorText}>Username or password is incorrect.</Text>
          )}

          {/* Pressable is more controllable, can switch to button later */}
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text onPress={() => router.navigate('./register')}>
              Create a user
            </Text>
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