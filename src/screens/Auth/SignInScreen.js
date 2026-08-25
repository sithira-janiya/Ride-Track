import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../reducers/Auth/authReducers';
import COLORS from '../../constants/colors';

// ── Pixel 6 baseline: 412 × 915 dp ──────────────────────────────────────────
const { width: W, height: H } = Dimensions.get('window');
const BASE_W = 412;
const BASE_H = 915;
// Scale a horizontal value relative to Pixel 6 width
const sw = (val) => (W / BASE_W) * val;
// Scale a vertical value relative to Pixel 6 height
const sh = (val) => (H / BASE_H) * val;
// Clamp to avoid going too large on tablets
const rs = (val) => Math.min(sw(val), val * 1.15);

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);

    // TODO: Replace with real PocketBase auth call
    setTimeout(() => {
      setLoading(false);
      dispatch(signInSuccess({ email }));
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Brand Mark ── */}
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Text style={styles.brandIconText}>🚌</Text>
            </View>
            <Text style={styles.brandName}>RideTrack</Text>
          </View>

          {/* ── Headline ── */}
          <View style={styles.headlineBlock}>
            <Text style={styles.headline}>Welcome back</Text>
            <Text style={styles.subheadline}>
              Sign in to track your rides, passes, and journeys.
            </Text>
          </View>

          {/* ── Form Card ── */}
          <View style={styles.formCard}>
            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email address</Text>
              <View style={[styles.inputWrap, emailFocused && styles.inputWrapFocused]}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.inputWrap, passwordFocused && styles.inputWrapFocused]}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textMuted}
                  secureTextEntry={secureText}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeBtn}>
                  <Text style={styles.eyeIcon}>{secureText ? '👁️' : '🙈'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Error */}
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️  {error}</Text>
              </View>
            ) : null}

            {/* Sign In Button */}
            <TouchableOpacity
              style={[styles.signInBtn, loading && styles.signInBtnDisabled]}
              onPress={handleSignIn}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.textOnAccent} />
              ) : (
                <Text style={styles.signInBtnText}>Sign In →</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialBtnText}>G  Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialBtnText}>📱  Phone</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.footerLink}>Sign up free</Text>
            </TouchableOpacity>
          </View>

          {/* ── Terms ── */}
          <Text style={styles.terms}>
            By signing in you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> &{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
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
});
