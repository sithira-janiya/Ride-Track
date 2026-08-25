import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import COLORS from '../../constants/colors';

const FILTER_OPTS = ['All', 'This Month', 'Last Month', 'Older'];

const HISTORY = [
  {
    date: 'Today',
    trips: [
      { id: 'T1', from: 'Colombo Fort', to: 'Nugegoda', time: '08:14 AM', fare: 65, bus: '138', duration: '34 min', rating: 4 },
      { id: 'T2', from: 'Nugegoda', to: 'Colombo Fort', time: '06:50 AM', fare: 45, bus: '138', duration: '28 min', rating: 5 },
    ],
  },
  {
    date: 'Yesterday',
    trips: [
      { id: 'T3', from: 'Maharagama', to: 'Nugegoda', time: '09:30 PM', fare: 30, bus: '174', duration: '18 min', rating: 3 },
      { id: 'T4', from: 'Nugegoda', to: 'Maharagama', time: '06:15 PM', fare: 30, bus: '174', duration: '22 min', rating: 4 },
    ],
  },
  {
    date: '23 Aug 2026',
    trips: [
      { id: 'T5', from: 'Borella', to: 'Nugegoda', time: '10:00 AM', fare: 55, bus: '155', duration: '30 min', rating: 4 },
    ],
  },
];

const StarRating = ({ rating }) => (
  <View style={{ flexDirection: 'row' }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Text key={i} style={{ fontSize: 10, color: i < rating ? COLORS.warning : COLORS.surfaceMuted }}>★</Text>
    ))}
  </View>
);

const TripRow = ({ trip }) => (
  <View style={styles.tripRow}>
    {/* Timeline dot */}
    <View style={styles.timelineDot} />
    <View style={styles.tripContent}>
      <View style={styles.tripHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.tripRoute}>
            {trip.from} <Text style={{ color: COLORS.accent }}>→</Text> {trip.to}
          </Text>
          <Text style={styles.tripMeta}>Bus {trip.bus} · {trip.time} · {trip.duration}</Text>
          <StarRating rating={trip.rating} />
        </View>
        <View style={styles.tripFareBox}>
          <Text style={styles.tripFare}>LKR {trip.fare}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default function HistoryScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const totalTrips = HISTORY.flatMap((g) => g.trips).length;
  const totalSpend = HISTORY.flatMap((g) => g.trips).reduce((s, t) => s + t.fare, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <TouchableOpacity style={styles.exportBtn} activeOpacity={0.8}>
          <Text style={styles.exportBtnText}>⬇ Export</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Strip */}
      <View style={styles.summaryStrip}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalTrips}</Text>
          <Text style={styles.summaryLabel}>Total Trips</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>LKR {totalSpend}</Text>
          <Text style={styles.summaryLabel}>Total Spent</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: COLORS.success }]}>LKR 120</Text>
          <Text style={styles.summaryLabel}>Saved (Pass)</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search routes, bus numbers..."
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      {/* Filter Pills */}
      <View style={styles.filterRow}>
        {FILTER_OPTS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterPill, filter === f && styles.filterPillActive]}
            onPress={() => setFilter(f)}
            activeOpacity={0.75}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {HISTORY.map((group) => (
          <View key={group.date} style={styles.group}>
            {/* Date Header */}
            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>{group.date}</Text>
              <View style={styles.dateLine} />
              <Text style={styles.dateFare}>
                LKR {group.trips.reduce((s, t) => s + t.fare, 0)}
              </Text>
            </View>

            {/* Trips Timeline */}
            <View style={styles.timeline}>
              {group.trips.map((trip, i) => (
                <React.Fragment key={trip.id}>
                  <TripRow trip={trip} />
                  {i < group.trips.length - 1 && <View style={styles.timelineConnector} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Spending Chart Teaser */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Spending</Text>
          <View style={styles.barChart}>
            {[40, 65, 35, 80, 55, 90, 45].map((h, i) => (
              <View key={i} style={styles.barCol}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: h * 0.8,
                      backgroundColor: i === 5 ? COLORS.accent : COLORS.surface,
                      borderWidth: i === 5 ? 0 : 1,
                      borderColor: COLORS.border,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.chartSub}>Highest spend: Saturday</Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1, paddingHorizontal: 20 },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  headerTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary },
  exportBtn: {
    backgroundColor: COLORS.surface, paddingHorizontal: 14,
    paddingVertical: 9, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border,
  },
  exportBtnText: { color: COLORS.textSecondary, fontWeight: '600', fontSize: 13 },

  // Summary
  summaryStrip: {
    flexDirection: 'row', marginHorizontal: 20, marginBottom: 14,
    backgroundColor: COLORS.surface, borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: COLORS.border,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: 18, fontWeight: '800', color: COLORS.accent, marginBottom: 2 },
  summaryLabel: { fontSize: 11, color: COLORS.textSecondary },
  summaryDivider: { width: 1, backgroundColor: COLORS.border, marginHorizontal: 8 },

  // Search
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface, borderRadius: 14,
    marginHorizontal: 20, marginBottom: 12,
    paddingHorizontal: 14, paddingVertical: 4,
    borderWidth: 1, borderColor: COLORS.border,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.textPrimary, height: 40 },

  // Filter
  filterRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, gap: 8 },
  filterPill: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border,
  },
  filterPillActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
  filterText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' },
  filterTextActive: { color: COLORS.accent },

  // Group
  group: { marginBottom: 20 },
  dateHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  dateText: { fontSize: 13, fontWeight: '700', color: COLORS.textSecondary, marginRight: 8 },
  dateLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dateFare: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary, marginLeft: 8 },

  // Timeline
  timeline: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  tripRow: { flexDirection: 'row', alignItems: 'flex-start' },
  timelineDot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: COLORS.accent, marginTop: 4, marginRight: 12,
    borderWidth: 2, borderColor: COLORS.accentDim,
  },
  timelineConnector: {
    width: 2, height: 16, backgroundColor: COLORS.border,
    marginLeft: 4, marginVertical: 2,
  },
  tripContent: { flex: 1 },
  tripHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  tripRoute: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 3 },
  tripMeta: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 3 },
  tripFareBox: {
    backgroundColor: COLORS.accentDim, borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1, borderColor: COLORS.accent,
    marginLeft: 8,
  },
  tripFare: { fontSize: 13, fontWeight: '800', color: COLORS.accent },

  // Chart
  chartCard: {
    backgroundColor: COLORS.surface, borderRadius: 16,
    padding: 18, borderWidth: 1, borderColor: COLORS.border, marginBottom: 8,
  },
  chartTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', height: 80, gap: 8, marginBottom: 8 },
  barCol: { flex: 1, alignItems: 'center' },
  bar: { width: '100%', borderRadius: 6, marginBottom: 4 },
  barLabel: { fontSize: 10, color: COLORS.textSecondary },
  chartSub: { fontSize: 12, color: COLORS.textSecondary },
});
