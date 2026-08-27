import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthHeader from '../../components/Auth/AuthHeader';
import AuthInput from '../../components/Auth/AuthInput';
import { useAuthStore } from '../../store/useAuthStore';

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
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
    backgroundColor: COLORS.background,   // 60% Deep Navy
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: sw(24),
    // Extra top padding pushes "Welcome back" card lower on Pixel 6
    paddingTop: sh(72),
    paddingBottom: sh(40),
  },

  // Brand
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sh(36),
  },
  brandIcon: {
    width: rs(44),
    height: rs(44),
    borderRadius: rs(13),
    backgroundColor: COLORS.accentDim,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sw(10),
  },
  brandIconText: { fontSize: rs(21) },
  brandName: {
    fontSize: rs(22),
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },

  // Headline
  headlineBlock: { marginBottom: sh(24) },
  headline: {
    fontSize: rs(30),
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: sh(8),
  },
  subheadline: {
    fontSize: rs(15),
    color: COLORS.textSecondary,
    lineHeight: rs(22),
  },

  // Form Card — 30% Rich Indigo surface
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: rs(20),
    padding: sw(22),
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: sh(22),
  },

  // Fields
  fieldGroup: { marginBottom: sh(16) },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sh(8),
  },
  label: {
    fontSize: rs(13),
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: sh(8),
    letterSpacing: 0.3,
  },
  forgotText: {
    fontSize: rs(12),
    color: COLORS.accent,
    fontWeight: '600',
    marginBottom: sh(8),
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: rs(14),
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: sw(14),
    height: sh(52),
  },
  inputWrapFocused: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accentGlow,
  },
  inputIcon: { fontSize: rs(16), marginRight: sw(10) },
  input: {
    flex: 1,
    fontSize: rs(15),
    color: COLORS.textPrimary,
    height: '100%',
  },
  eyeBtn: { padding: sw(4) },
  eyeIcon: { fontSize: rs(16) },

  // Error
  errorBox: {
    backgroundColor: 'rgba(255,92,122,0.12)',
    borderRadius: rs(10),
    padding: sw(12),
    marginBottom: sh(14),
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  errorText: { fontSize: rs(13), color: COLORS.error, fontWeight: '600' },

  // Sign In Button — 10% Electric Teal accent
  signInBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: rs(14),
    height: sh(52),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sh(4),
    marginBottom: sh(18),
  },
  signInBtnDisabled: { opacity: 0.65 },
  signInBtnText: {
    color: COLORS.textOnAccent,
    fontSize: rs(16),
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sh(14),
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: {
    fontSize: rs(12),
    color: COLORS.textMuted,
    marginHorizontal: sw(10),
  },

  // Social
  socialRow: { flexDirection: 'row', gap: sw(12) },
  socialBtn: {
    flex: 1,
    height: sh(46),
    borderRadius: rs(12),
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtnText: {
    fontSize: rs(13),
    fontWeight: '700',
    color: COLORS.textSecondary,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sh(14),
  },
  footerText: { fontSize: rs(14), color: COLORS.textSecondary },
  footerLink: {
    fontSize: rs(14),
    color: COLORS.accent,
    fontWeight: '700',
  },

  // Terms
  terms: {
    fontSize: rs(11),
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: rs(18),
  },
  termsLink: {
    color: COLORS.accent,
    fontWeight: '600',
  },
  loading: {
    marginBottom: 12,
  },
});
