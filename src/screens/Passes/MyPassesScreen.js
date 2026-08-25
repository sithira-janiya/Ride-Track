import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');

const TABS = ['Active', 'Upcoming', 'Expired'];

const PASSES = {
  Active: [
    {
      id: 'P001',
      type: 'Monthly Pass',
      route: 'Colombo — Nugegoda',
      validUntil: '31 Aug 2026',
      tripsLeft: 22,
      totalTrips: 30,
      price: 'LKR 1,800',
      color: COLORS.accent,
    },
    {
      id: 'P002',
      type: 'Weekly Pass',
      route: 'All Routes · Zone A',
      validUntil: '29 Aug 2026',
      tripsLeft: 8,
      totalTrips: 14,
      price: 'LKR 650',
      color: '#5B9EFF',
    },
  ],
  Upcoming: [
    {
      id: 'P003',
      type: 'Monthly Pass',
      route: 'Colombo — Maharagama',
      validUntil: '30 Sep 2026',
      tripsLeft: 30,
      totalTrips: 30,
      price: 'LKR 2,100',
      color: COLORS.warning,
    },
  ],
  Expired: [
    {
      id: 'P004',
      type: 'Weekly Pass',
      route: 'Nugegoda — Fort',
      validUntil: '10 Aug 2026',
      tripsLeft: 0,
      totalTrips: 14,
      price: 'LKR 600',
      color: COLORS.textMuted,
    },
    {
      id: 'P005',
      type: 'Day Pass',
      route: 'All Routes',
      validUntil: '05 Aug 2026',
      tripsLeft: 0,
      totalTrips: 5,
      price: 'LKR 250',
      color: COLORS.textMuted,
    },
  ],
};

const PassCard = ({ pass, expired }) => {
  const progress = pass.tripsLeft / pass.totalTrips;
  return (
    <View style={[styles.passCard, expired && styles.passCardExpired]}>
      {/* Top gradient strip */}
      <View style={[styles.passStrip, { backgroundColor: pass.color }]} />

      <View style={styles.passBody}>
        <View style={styles.passTopRow}>
          <View>
            <Text style={styles.passType}>{pass.type}</Text>
            <Text style={[styles.passRoute, expired && { color: COLORS.textMuted }]}>{pass.route}</Text>
          </View>
          <View style={[styles.passPriceBadge, { borderColor: expired ? COLORS.border : pass.color }]}>
            <Text style={[styles.passPriceText, { color: expired ? COLORS.textMuted : pass.color }]}>
              {pass.price}
            </Text>
          </View>
        </View>

        {/* Dashed separator */}
        <View style={styles.dashedLine} />

        {/* Progress */}
        <View style={styles.passProgressRow}>
          <Text style={styles.passProgressLabel}>
            <Text style={[styles.passProgressNum, { color: expired ? COLORS.textMuted : pass.color }]}>
              {pass.tripsLeft}
            </Text>
            /{pass.totalTrips} trips left
          </Text>
          <Text style={[styles.passValidity, expired && { color: COLORS.error }]}>
            {expired ? '✕ Expired' : '✓'} {pass.validUntil}
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%`, backgroundColor: expired ? COLORS.surfaceMuted : pass.color },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default function MyPassesScreen() {
  const [activeTab, setActiveTab] = useState('Active');
  const passes = PASSES[activeTab] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Passes</Text>
        <TouchableOpacity style={styles.buyBtn} activeOpacity={0.8}>
          <Text style={styles.buyBtnText}>＋ Buy Pass</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {passes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎫</Text>
            <Text style={styles.emptyTitle}>No {activeTab} Passes</Text>
            <Text style={styles.emptySubtitle}>Your {activeTab.toLowerCase()} passes will appear here.</Text>
          </View>
        ) : (
          passes.map((pass) => (
            <PassCard key={pass.id} pass={pass} expired={activeTab === 'Expired'} />
          ))
        )}

        {/* Promo Banner */}
        {activeTab === 'Active' && (
          <View style={styles.promoBanner}>
            <Text style={styles.promoEmoji}>🎉</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.promoTitle}>Save 20% on Monthly Pass</Text>
              <Text style={styles.promoSub}>Renew before 31 Aug to unlock discount</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.promoAction}>Claim →</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8,
  },
  headerTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary },
  buyBtn: {
    backgroundColor: COLORS.accent, paddingHorizontal: 16,
    paddingVertical: 9, borderRadius: 24,
  },
  buyBtnText: { color: COLORS.textOnAccent, fontWeight: '700', fontSize: 13 },

  // Tabs
  tabsRow: {
    flexDirection: 'row', paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: COLORS.border, marginBottom: 16,
  },
  tab: { marginRight: 28, paddingBottom: 10, position: 'relative' },
  tabActive: {},
  tabText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '600' },
  tabTextActive: { color: COLORS.textPrimary },
  tabUnderline: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 2.5, backgroundColor: COLORS.accent, borderRadius: 2,
  },

  // Pass Card
  passCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18, marginBottom: 14,
    borderWidth: 1, borderColor: COLORS.border,
    overflow: 'hidden',
  },
  passCardExpired: { opacity: 0.65 },
  passStrip: { height: 5 },
  passBody: { padding: 18 },
  passTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  passType: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 4 },
  passRoute: { fontSize: 13, color: COLORS.textSecondary },
  passPriceBadge: {
    borderWidth: 1.5, borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  passPriceText: { fontSize: 13, fontWeight: '700' },
  dashedLine: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  passProgressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  passProgressLabel: { fontSize: 12, color: COLORS.textSecondary },
  passProgressNum: { fontSize: 16, fontWeight: '800' },
  passValidity: { fontSize: 12, color: COLORS.success, fontWeight: '600' },
  progressTrack: {
    height: 6, backgroundColor: COLORS.surfaceMuted,
    borderRadius: 3, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },

  // Empty
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center' },

  // Promo
  promoBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.accentDim,
    borderRadius: 14, padding: 14, marginTop: 4,
    borderWidth: 1, borderColor: COLORS.accent,
    gap: 10,
  },
  promoEmoji: { fontSize: 22 },
  promoTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 2 },
  promoSub: { fontSize: 12, color: COLORS.textSecondary },
  promoAction: { fontSize: 14, fontWeight: '700', color: COLORS.accent },

  surfaceMuted: { backgroundColor: COLORS.surfaceMuted },
  textMuted: { color: COLORS.textMuted },
});
