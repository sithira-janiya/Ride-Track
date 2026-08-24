import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import AuthHeader from '../../components/Auth/AuthHeader';
import AuthInput from '../../components/Auth/AuthInput';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Sign up payload', { name, email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AuthHeader title="Create account" subtitle="Start tracking your rides in one place." />
        <AuthInput label="Full Name" placeholder="Jane Rider" value={name} onChangeText={setName} />
        <AuthInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
        <AuthInput
          label="Password"
          placeholder="Create a secure password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Create Account" onPress={handleSignUp} />
        <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
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
});
