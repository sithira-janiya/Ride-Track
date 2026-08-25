import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// ─── Mini Icon Components ────────────────────────────────────────────────────
const BusIcon = ({ size = 20, color = COLORS.accent }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ width: size * 0.85, height: size * 0.65, backgroundColor: color, borderRadius: 4, justifyContent: 'flex-end', paddingHorizontal: 3, paddingBottom: 2 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.textOnAccent }} />
        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.textOnAccent }} />
      </View>
    </View>
  </View>
);

const LocationDot = ({ color = COLORS.accent, size = 8 }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, borderWidth: 1.5, borderColor: COLORS.background }} />
);

// ─── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ label, value, unit, accentBar }) => (
  <View style={styles.statCard}>
    {accentBar && <View style={styles.statAccentBar} />}
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statUnit}>{unit}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─── Quick Action Button ─────────────────────────────────────────────────────
const QuickAction = ({ emoji, label, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.75}>
    <View style={styles.quickActionIcon}>
      <Text style={styles.quickActionEmoji}>{emoji}</Text>
    </View>
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

// ─── Journey Row ─────────────────────────────────────────────────────────────
const JourneyRow = ({ route, time, fare, status }) => (
  <View style={styles.journeyRow}>
    <View style={styles.journeyDot}>
      <LocationDot color={status === 'completed' ? COLORS.success : COLORS.accent} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.journeyRoute}>{route}</Text>
      <Text style={styles.journeyTime}>{time}</Text>
    </View>
    <Text style={[styles.journeyFare, status === 'completed' && { color: COLORS.success }]}>{fare}</Text>
  </View>
);

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting} 👋</Text>
            <Text style={styles.name}>Sithira</Text>
          </View>
          <TouchableOpacity style={styles.avatar} activeOpacity={0.8}>
            <Text style={styles.avatarText}>S</Text>
          </TouchableOpacity>
        </View>

        {/* ── Wallet Balance Strip ── */}
        <View style={styles.walletStrip}>
          <View>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
            <Text style={styles.walletAmount}>LKR 2,450.00</Text>
          </View>
          <TouchableOpacity style={styles.topUpBtn} activeOpacity={0.8}>
            <Text style={styles.topUpText}>＋ Top Up</Text>
          </TouchableOpacity>
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <StatCard label="Rides Today" value="3" unit="trips" accentBar />
          <StatCard label="Distance" value="18.4" unit="km" accentBar />
          <StatCard label="Saved" value="LKR 120" unit="this week" />
        </View>

        {/* ── Active Journey Card ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Journey</Text>
          <View style={styles.liveChip}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        <View style={styles.activeCard}>
          <View style={styles.activeCardTop}>
            <BusIcon size={28} color={COLORS.accent} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.activeBusName}>Bus 138 · Colombo – Nugegoda</Text>
              <Text style={styles.activeEta}>Arriving in <Text style={{ color: COLORS.accent, fontWeight: '700' }}>4 min</Text></Text>
            </View>
            <View style={styles.activeFareBadge}>
              <Text style={styles.activeFareText}>LKR 35</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
            <View style={[styles.progressDot, { left: '62%' }]} />
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Bambalapitiya</Text>
            <Text style={[styles.progressLabel, { color: COLORS.accent }]}>Nugegoda ▸</Text>
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          <QuickAction emoji="🗺️" label="Plan Route" />
          <QuickAction emoji="🎫" label="Buy Pass" />
          <QuickAction emoji="📍" label="Nearest Stop" />
          <QuickAction emoji="🔔" label="Alerts" />
        </View>

        {/* ── Recent Journeys ── */}
        <View style={[styles.sectionHeader, { marginTop: 8 }]}>
          <Text style={styles.sectionTitle}>Recent Journeys</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <JourneyRow route="Colombo Fort → Maharagama" time="Today, 08:14 AM" fare="LKR 65" status="completed" />
          <View style={styles.divider} />
          <JourneyRow route="Nugegoda → Colombo Fort" time="Today, 06:50 AM" fare="LKR 45" status="completed" />
          <View style={styles.divider} />
          <JourneyRow route="Maharagama → Nugegoda" time="Yesterday, 09:30 PM" fare="LKR 30" status="completed" />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 13, color: COLORS.textSecondary, letterSpacing: 0.3 },
  name: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginTop: 2 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '800', color: COLORS.textOnAccent },

  // Wallet
  walletStrip: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  walletLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 4, letterSpacing: 0.5 },
  walletAmount: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary },
  topUpBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  topUpText: { color: COLORS.textOnAccent, fontWeight: '700', fontSize: 13 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  statAccentBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 3, backgroundColor: COLORS.accent, borderRadius: 2,
  },
  statValue: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, marginTop: 6 },
  statUnit: { fontSize: 10, color: COLORS.accent, fontWeight: '600', marginBottom: 2 },
  statLabel: { fontSize: 11, color: COLORS.textSecondary },

  // Section Headers
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  seeAll: { fontSize: 13, color: COLORS.accent, fontWeight: '600' },
  liveChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,92,122,0.15)',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.error, marginRight: 5 },
  liveText: { fontSize: 10, color: COLORS.error, fontWeight: '800', letterSpacing: 1 },

  // Active Card
  activeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeCardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  activeBusName: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  activeEta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 3 },
  activeFareBadge: {
    backgroundColor: COLORS.accentDim,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 10, borderWidth: 1, borderColor: COLORS.accent,
  },
  activeFareText: { color: COLORS.accent, fontWeight: '700', fontSize: 13 },
  progressTrack: {
    height: 6, backgroundColor: COLORS.surfaceMuted,
    borderRadius: 3, marginBottom: 8, position: 'relative',
  },
  progressFill: {
    position: 'absolute', left: 0, top: 0, bottom: 0,
    width: '62%', backgroundColor: COLORS.accent, borderRadius: 3,
  },
  progressDot: {
    position: 'absolute', top: -4,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: COLORS.accent,
    borderWidth: 2.5, borderColor: COLORS.background,
  },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: 12, color: COLORS.textSecondary },

  // Quick Actions
  quickActionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  quickAction: { alignItems: 'center', width: (width - 64) / 4 },
  quickActionIcon: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1, borderColor: COLORS.border,
  },
  quickActionEmoji: { fontSize: 22 },
  quickActionLabel: { fontSize: 11, color: COLORS.textSecondary, textAlign: 'center', fontWeight: '500' },

  // Card
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Journey rows
  journeyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  journeyDot: { marginRight: 12 },
  journeyRoute: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 3 },
  journeyTime: { fontSize: 12, color: COLORS.textSecondary },
  journeyFare: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  divider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: -4 },
});
