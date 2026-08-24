import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthHeader from '../../components/Auth/AuthHeader';
import AuthInput from '../../components/Auth/AuthInput';
import { useAuthStore } from '../../store/useAuthStore';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();

  const handleSignIn = async () => {
    const success = await login(email, password);

    if (!success) {
      Alert.alert('Sign in failed', useAuthStore.getState().error || 'Unable to sign in.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AuthHeader title="Welcome back" subtitle="Sign in to keep your rides in sync." />
        <AuthInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
        <AuthInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {isLoading ? <ActivityIndicator style={styles.loading} /> : null}
        <Button title="Sign In" onPress={handleSignIn} disabled={isLoading} />
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Need an account? Sign up
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
});
