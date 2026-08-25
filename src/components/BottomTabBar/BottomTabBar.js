import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import COLORS from '../../constants/colors';

// ── SVG-free icon shapes built from View primitives ──────────────────────────

const HomeIcon = ({ active }) => {
  const c = active ? COLORS.accent : COLORS.textMuted;
  return (
    <View style={{ width: 24, height: 22, alignItems: 'center' }}>
      {/* Roof */}
      <View style={{
        width: 0, height: 0,
        borderLeftWidth: 12, borderRightWidth: 12, borderBottomWidth: 10,
        borderLeftColor: 'transparent', borderRightColor: 'transparent',
        borderBottomColor: c,
      }} />
      {/* Walls */}
      <View style={{ width: 16, height: 11, backgroundColor: c, borderRadius: 2 }} />
      {/* Door */}
      {active && (
        <View style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'flex-end' }]}>
          <View style={{ width: 5, height: 5, backgroundColor: COLORS.background, borderRadius: 1, marginBottom: 0 }} />
        </View>
      )}
    </View>
  );
};

const PassIcon = ({ active }) => {
  const c = active ? COLORS.accent : COLORS.textMuted;
  return (
    <View style={{
      width: 24, height: 18, borderRadius: 5,
      borderWidth: 2, borderColor: c,
      justifyContent: 'center', alignItems: 'center',
    }}>
      <View style={{ width: 14, height: 2, backgroundColor: c, borderRadius: 1, marginBottom: 3 }} />
      <View style={{ width: 14, height: 2, backgroundColor: c, borderRadius: 1 }} />
    </View>
  );
};

const JourneyIcon = ({ active }) => {
  const c = active ? COLORS.accent : COLORS.textMuted;
  return (
    <View style={{ width: 24, height: 22, alignItems: 'center', justifyContent: 'center' }}>
      {/* Bus shape */}
      <View style={{
        width: 20, height: 14, backgroundColor: c,
        borderRadius: 4, justifyContent: 'flex-end', paddingHorizontal: 2, paddingBottom: 2,
      }}>
        {/* Windows */}
        <View style={{ flexDirection: 'row', gap: 3, marginBottom: 2 }}>
          <View style={{ width: 5, height: 4, backgroundColor: active ? COLORS.textOnAccent : COLORS.background, borderRadius: 1 }} />
          <View style={{ width: 5, height: 4, backgroundColor: active ? COLORS.textOnAccent : COLORS.background, borderRadius: 1 }} />
          <View style={{ width: 5, height: 4, backgroundColor: active ? COLORS.textOnAccent : COLORS.background, borderRadius: 1 }} />
        </View>
        {/* Wheels */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 1 }}>
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: active ? COLORS.textOnAccent : COLORS.background }} />
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: active ? COLORS.textOnAccent : COLORS.background }} />
        </View>
      </View>
    </View>
  );
};

const HistoryIcon = ({ active }) => {
  const c = active ? COLORS.accent : COLORS.textMuted;
  return (
    <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: c, justifyContent: 'center', alignItems: 'center' }}>
      {/* Clock hands */}
      <View style={{ width: 1.5, height: 6, backgroundColor: c, borderRadius: 1, position: 'absolute', top: 3, left: 9 }} />
      <View style={{ width: 5, height: 1.5, backgroundColor: c, borderRadius: 1, position: 'absolute', top: 8, left: 9 }} />
    </View>
  );
};

// ── Tab Item ─────────────────────────────────────────────────────────────────
const TAB_CONFIG = [
  { key: 'Home', label: 'Home', Icon: HomeIcon },
  { key: 'MyPasses', label: 'My Passes', Icon: PassIcon },
  { key: 'Journeys', label: 'Journeys', Icon: JourneyIcon },
  { key: 'History', label: 'History', Icon: HistoryIcon },
];

export default function BottomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[index];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              activeOpacity={0.75}
              style={styles.tabItem}
            >
              {/* Active pill background */}
              {isFocused && <View style={styles.activePill} />}

              {/* Active indicator top */}
              {isFocused && <View style={styles.activeIndicator} />}

              {/* Icon */}
              <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
                <config.Icon active={isFocused} />
              </View>

              {/* Label */}
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {config.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    position: 'relative',
  },
  activePill: {
    position: 'absolute',
    top: -4, left: 6, right: 6, bottom: -4,
    backgroundColor: COLORS.accentGlow,
    borderRadius: 16,
  },
  activeIndicator: {
    position: 'absolute',
    top: -9, left: '30%', right: '30%',
    height: 3,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  iconWrap: {
    marginBottom: 4,
  },
  iconWrapActive: {
    // slight scale handled visually by active pill
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});
