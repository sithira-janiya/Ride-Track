import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import COLORS from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const NEARBY_STOPS = [
  { id: 1, name: 'Nugegoda Junction', distance: '120m', buses: ['138', '174', '155'], busy: true },
  { id: 2, name: 'Nugegoda Market', distance: '280m', buses: ['100', '102'], busy: false },
  { id: 3, name: 'Wijerama Mawatha', distance: '450m', buses: ['155', '177', '115'], busy: false },
];

const LIVE_BUSES = [
  { id: 'B1', number: '138', heading: 'Fort → Nugegoda', eta: '3 min', occupancy: 0.7 },
  { id: 'B2', number: '174', heading: 'Maharagama → Borella', eta: '8 min', occupancy: 0.4 },
  { id: 'B3', number: '155', heading: 'Nugegoda → Kandy Rd', eta: '12 min', occupancy: 0.9 },
];

const OccupancyBar = ({ value }) => {
  const color = value > 0.75 ? COLORS.error : value > 0.5 ? COLORS.warning : COLORS.success;
  return (
    <View style={styles.occTrack}>
      <View style={[styles.occFill, { width: `${value * 100}%`, backgroundColor: color }]} />
    </View>
  );
};

const BusLiveRow = ({ bus }) => (
  <View style={styles.busLiveRow}>
    <View style={styles.busNumberBadge}>
      <Text style={styles.busNumber}>{bus.number}</Text>
    </View>
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.busHeading}>{bus.heading}</Text>
      <OccupancyBar value={bus.occupancy} />
    </View>
    <View style={styles.etaBadge}>
      <Text style={styles.etaText}>{bus.eta}</Text>
    </View>
  </View>
);

export default function JourneysScreen() {
  const [fromText, setFromText] = useState('Nugegoda Junction');
  const [toText, setToText] = useState('');
  const [activeStop, setActiveStop] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Journeys</Text>
        <TouchableOpacity style={styles.scanBtn} activeOpacity={0.8}>
          <Text style={styles.scanBtnText}>⌛ Plan</Text>
        </TouchableOpacity>
      </View>

      {/* Route Search Bar */}
      <View style={styles.searchCard}>
        <View style={styles.searchRow}>
          <View style={styles.searchDotGreen} />
          <TextInput
            style={styles.searchInput}
            value={fromText}
            onChangeText={setFromText}
            placeholder="From..."
            placeholderTextColor={COLORS.textMuted}
          />
        </View>
        <View style={styles.searchDivider} />
        <View style={styles.searchRow}>
          <View style={styles.searchDotAccent} />
          <TextInput
            style={styles.searchInput}
            value={toText}
            onChangeText={setToText}
            placeholder="Where to?"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}>
          <Text style={styles.searchBtnText}>🔍  Find Route</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <View key={i} style={styles.mapGridLine} />
            ))}
          </View>
          {/* Bus Marker */}
          <View style={[styles.mapMarker, { top: '40%', left: '55%' }]}>
            <View style={styles.mapBusIcon}>
              <Text style={{ fontSize: 14 }}>🚌</Text>
            </View>
            <View style={styles.mapPulse} />
          </View>
          {/* Stop Markers */}
          <View style={[styles.stopMarker, { top: '30%', left: '30%' }]}>
            <Text style={styles.stopMarkerText}>A</Text>
          </View>
          <View style={[styles.stopMarker, { top: '65%', left: '70%', backgroundColor: COLORS.accent }]}>
            <Text style={[styles.stopMarkerText, { color: COLORS.textOnAccent }]}>B</Text>
          </View>

          <View style={styles.mapOverlayChip}>
            <View style={styles.livePulse} />
            <Text style={styles.mapOverlayText}>Live Tracking Active</Text>
          </View>
        </View>

        {/* Nearby Stops */}
        <Text style={styles.sectionTitle}>Nearby Stops</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stopsScroll}>
          {NEARBY_STOPS.map((stop) => (
            <TouchableOpacity
              key={stop.id}
              style={[styles.stopChip, activeStop === stop.id && styles.stopChipActive]}
              onPress={() => setActiveStop(stop.id)}
              activeOpacity={0.75}
            >
              <Text style={[styles.stopChipName, activeStop === stop.id && styles.stopChipNameActive]}>
                📍 {stop.name}
              </Text>
              <Text style={[styles.stopChipDist, activeStop === stop.id && { color: COLORS.accent }]}>
                {stop.distance}
              </Text>
              {stop.busy && (
                <View style={styles.busyBadge}>
                  <Text style={styles.busyText}>Busy</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Live Buses at selected stop */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Buses Arriving</Text>
          <View style={styles.liveChip}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        <View style={styles.card}>
          {LIVE_BUSES.map((bus, i) => (
            <React.Fragment key={bus.id}>
              <BusLiveRow bus={bus} />
              {i < LIVE_BUSES.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
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
  scanBtn: {
    backgroundColor: COLORS.surface, paddingHorizontal: 14,
    paddingVertical: 9, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border,
  },
  scanBtnText: { color: COLORS.textPrimary, fontWeight: '600', fontSize: 13 },

  // Search Card
  searchCard: {
    backgroundColor: COLORS.surface, borderRadius: 16,
    marginHorizontal: 20, marginBottom: 16,
    padding: 14, borderWidth: 1, borderColor: COLORS.border,
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  searchDotGreen: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: COLORS.success, marginRight: 12,
  },
  searchDotAccent: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: COLORS.accent, marginRight: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.textPrimary, height: 36 },
  searchDivider: {
    height: 1, backgroundColor: COLORS.border,
    marginLeft: 22, marginVertical: 4,
  },
  searchBtn: {
    marginTop: 10, backgroundColor: COLORS.accent,
    borderRadius: 12, paddingVertical: 12, alignItems: 'center',
  },
  searchBtnText: { color: COLORS.textOnAccent, fontWeight: '700', fontSize: 14 },

  // Map
  mapPlaceholder: {
    height: 200, backgroundColor: COLORS.surfaceMuted,
    borderRadius: 18, overflow: 'hidden', marginBottom: 20,
    borderWidth: 1, borderColor: COLORS.border, position: 'relative',
  },
  mapGrid: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row', justifyContent: 'space-around',
  },
  mapGridLine: { width: 1, backgroundColor: COLORS.border, opacity: 0.4 },
  mapMarker: { position: 'absolute', alignItems: 'center' },
  mapBusIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: COLORS.accent,
  },
  mapPulse: {
    position: 'absolute', width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.accentDim, top: -6, left: -6, zIndex: -1,
  },
  stopMarker: {
    position: 'absolute', width: 24, height: 24, borderRadius: 12,
    backgroundColor: COLORS.surface, borderWidth: 2, borderColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  stopMarkerText: { fontSize: 10, fontWeight: '800', color: COLORS.accent },
  mapOverlayChip: {
    position: 'absolute', bottom: 10, left: 10,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(10,14,26,0.85)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: COLORS.border,
  },
  livePulse: {
    width: 7, height: 7, borderRadius: 3.5,
    backgroundColor: COLORS.error, marginRight: 6,
  },
  mapOverlayText: { fontSize: 11, color: COLORS.textPrimary, fontWeight: '600' },

  // Stops scroll
  stopsScroll: { marginBottom: 16 },
  stopChip: {
    backgroundColor: COLORS.surface, borderRadius: 14, padding: 12,
    marginRight: 10, borderWidth: 1, borderColor: COLORS.border, minWidth: 130,
  },
  stopChipActive: { borderColor: COLORS.accent, backgroundColor: COLORS.accentDim },
  stopChipName: { fontSize: 12, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 2 },
  stopChipNameActive: { color: COLORS.accent },
  stopChipDist: { fontSize: 11, color: COLORS.textSecondary },
  busyBadge: {
    marginTop: 4, alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,92,122,0.15)',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  busyText: { fontSize: 10, color: COLORS.error, fontWeight: '700' },

  // Section headers
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 10 },
  liveChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,92,122,0.15)',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.error, marginRight: 5 },
  liveText: { fontSize: 10, color: COLORS.error, fontWeight: '800', letterSpacing: 1 },

  // Card
  card: {
    backgroundColor: COLORS.surface, borderRadius: 16,
    padding: 14, borderWidth: 1, borderColor: COLORS.border,
  },

  // Bus live row
  busLiveRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  busNumberBadge: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: COLORS.accentDim, borderWidth: 1.5, borderColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  busNumber: { fontSize: 14, fontWeight: '800', color: COLORS.accent },
  busHeading: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 6 },
  etaBadge: {
    backgroundColor: COLORS.surfaceMuted, borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  etaText: { fontSize: 12, fontWeight: '700', color: COLORS.accent },
  occTrack: { height: 4, backgroundColor: COLORS.surfaceMuted, borderRadius: 2, width: '100%' },
  occFill: { height: '100%', borderRadius: 2 },
  divider: { height: 1, backgroundColor: COLORS.border },

  surfaceMuted: { backgroundColor: COLORS.surfaceMuted },
});
