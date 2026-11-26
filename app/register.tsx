// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from 'react';
import { SafeAreaFrameContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '@/context/AuthContext';
import { router } from 'expo-router';

export default function Register() {
  const [name, onNameChange] = useState('');
  const [password, onPasswordChange] = useState<string | undefined>(); //Passwords are optional
  const [submitted, setSubmitted] = useState(false);
  const [failedSignUp, setFailedSignUp] = useState(false);

  const nameMissing = submitted && name.trim() === '';

  const { signUp } = useAuthContext();

  function handleLogin() {
    setSubmitted(true);

    if (name.trim() === "") {
      return; // Keep the user on the form until name is filled
    }

    if (!signUp(name, password)) {
      setFailedSignUp(true);
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

          {failedSignUp && (
            < Text style={styles.errorText}>Username is taken. Choose a different name</Text>
          )}

          {/* Pressable is more controllable, can switch to button later */}
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Register new User</Text>
          </Pressable>

          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text onPress={() => router.navigate('./login')}>
              Login in
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