// 60-30-10 Color Rule:
// 60% → Deep Navy (dominant background)
// 30% → Rich Indigo (cards, surfaces, secondary containers)
// 10% → Electric Teal (accent: CTAs, active states, highlights)

export const COLORS = {
  // 60% — Dominant background
  background: '#0A0E1A',
  backgroundAlt: '#0D1220',

  // 30% — Secondary surfaces / cards
  surface: '#1A2340',
  surfaceElevated: '#212C4A',
  surfaceMuted: '#151D33',
  border: '#2A3556',

  // 10% — Accent / brand pop
  accent: '#00D4AA',
  accentLight: '#00EFC0',
  accentDim: 'rgba(0,212,170,0.15)',
  accentGlow: 'rgba(0,212,170,0.08)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#8A9BBF',
  textMuted: '#556085',
  textOnAccent: '#0A0E1A',

  // Status
  success: '#00C896',
  warning: '#FFB547',
  error: '#FF5C7A',
  info: '#5B9EFF',

  // Legacy aliases (keep existing keys working)
  primary: '#00D4AA',
  secondary: '#1A2340',
  text: '#FFFFFF',
  muted: '#8A9BBF',
};

export default COLORS;
