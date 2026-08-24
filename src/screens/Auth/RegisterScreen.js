import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthHeader from '../../components/Auth/AuthHeader';
import AuthInput from '../../components/Auth/AuthInput';
import { useAuthStore } from '../../store/useAuthStore';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('passenger'); // default role
  const { register, isLoading, error } = useAuthStore();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match.');
      return;
    }

    const success = await register(name, email, mobile, password, role);

    if (!success) {
      Alert.alert('Registration failed', useAuthStore.getState().error || error || 'Unable to create your account.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AuthHeader title="Create account" subtitle="Start tracking your rides in one place." />
        <AuthInput label="Full Name" placeholder="Jane Rider" value={name} onChangeText={setName} />
        <AuthInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
        <AuthInput label="Mobile Number" placeholder="0771234567" value={mobile} onChangeText={setMobile} />
        <AuthInput
          label="Password"
          placeholder="Create a secure password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AuthInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        <Text style={styles.roleLabel}>Select your role</Text>
        <View style={styles.roleContainer}>
          {['passenger', 'driver', 'conductor'].map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.roleButton, role === r && styles.roleButtonActive]}
              onPress={() => setRole(r)}
            >
              <Text style={[styles.roleButtonText, role === r && styles.roleButtonTextActive]}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? <ActivityIndicator style={styles.loading} /> : null}
        <Button title="Create Account" onPress={handleSignUp} disabled={isLoading} />
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Already have an account? Sign in
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#2563eb',
    fontWeight: '600',
  },
  loading: {
    marginBottom: 12,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  roleButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  roleButtonText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
});
