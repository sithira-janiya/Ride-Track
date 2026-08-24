import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import AuthHeader from '../../components/Auth/AuthHeader';
import AuthInput from '../../components/Auth/AuthInput';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Sign in payload', { email, password });
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
        <Button title="Sign In" onPress={handleSignIn} />
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
});
