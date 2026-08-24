import React from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isSmallDevice = width <= 360;
const heroTitleSize = Math.min(34, width * 0.085);
const sectionTitleSize = Math.min(24, width * 0.065);

const features = [
  {
    title: 'Live Bus Tracking',
    description: 'See real-time arrival times and current bus positions on every route.',
  },
  {
    title: 'Route Alerts',
    description: 'Receive updates about delays, detours, and service disruptions instantly.',
  },
  {
    title: 'Smart Planning',
    description: 'Build better commutes by checking schedules before you even leave home.',
  },
];

export default function GreetingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <Text style={styles.brand}>RideTrack</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.eyebrow}>City transit made simple</Text>
            <Text style={styles.title}>Track every bus before it reaches your stop.</Text>
            <Text style={styles.subtitle}>
              RideTrack helps commuters stay on schedule with live bus locations, trip updates,
              and smarter route planning.
            </Text>

            <View style={[styles.actions, isSmallDevice && styles.actionsCompact]}>
              <View style={styles.primaryActionButton}>
                <Button title="Get Started" onPress={() => navigation.navigate('SignIn')} />
              </View>
              <View style={styles.secondaryActionButton}>
                <Button title="View Routes" onPress={() => navigation.navigate('SignUp')} />
              </View>
            </View>
          </View>

          <View style={styles.mockMap}>
            <View style={styles.mapHeader}>
              <Text style={styles.mapTitle}>Route 24</Text>
              <Text style={styles.mapStatus}>On time</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.stopGroup}>
              <View style={styles.stopDot} />
              <Text style={styles.stopLabel}>Central Station</Text>
            </View>
            <View style={styles.stopGroupMiddle}>
              <View style={styles.stopDotActive} />
              <Text style={styles.stopLabel}>Market Street</Text>
            </View>
            <View style={styles.stopGroup}>
              <View style={styles.stopDot} />
              <Text style={styles.stopLabel}>Riverside</Text>
            </View>
          </View>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why commuters choose RideTrack</Text>
          {features.map((feature) => (
            <View key={feature.title} style={styles.featureCard}>
              <View style={styles.featureIcon} />
              <View style={styles.featureTextWrap}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>Ready to ride smarter?</Text>
          <Text style={styles.ctaText}>See the next bus, plan your stop, and avoid waiting in the cold.</Text>
          <Button title="Create account" onPress={() => navigation.navigate('SignUp')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e8f0',
  },
  scrollContent: {
    paddingHorizontal: Math.min(20, width * 0.05),
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 20,
  },
  brand: {
    fontSize: Math.min(26, width * 0.07),
    fontWeight: '800',
    color: '#0f172a',
  },
  signInLink: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  heroCard: {
    backgroundColor: '#0f172a',
    borderRadius: 28,
    padding: Math.min(20, width * 0.05),
    marginBottom: 24,
  },
  heroTextWrap: {
    marginBottom: 20,
  },
  eyebrow: {
    color: '#93c5fd',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  title: {
    fontSize: heroTitleSize,
    fontWeight: '800',
    color: '#f8fafc',
    lineHeight: heroTitleSize + 8,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: Math.min(16, width * 0.04),
    color: '#cbd5e1',
    lineHeight: Math.min(24, width * 0.06),
    marginBottom: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  actionsCompact: {
    flexDirection: 'column',
  },
  primaryActionButton: {
    flex: 1,
    minWidth: 150,
  },
  secondaryActionButton: {
    flex: 1,
    minWidth: 150,
  },
  mockMap: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 16,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  mapStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
    backgroundColor: '#dcfce7',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  routeLine: {
    borderWidth: 3,
    borderColor: '#38bdf8',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginVertical: 12,
    height: 120,
  },
  stopGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  stopGroupMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 8,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#94a3b8',
    marginRight: 10,
  },
  stopDotActive: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#2563eb',
    marginRight: 10,
  },
  stopLabel: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
  featuresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: sectionTitleSize,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  featureIcon: {
    width: Math.min(42, width * 0.11),
    height: Math.min(42, width * 0.11),
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    marginRight: 14,
  },
  featureTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  featureTitle: {
    fontSize: Math.min(18, width * 0.05),
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  featureDescription: {
    color: '#475569',
    lineHeight: Math.min(22, width * 0.055),
    flexShrink: 1,
  },
  ctaBox: {
    backgroundColor: '#dbeafe',
    borderRadius: 22,
    padding: 20,
  },
  ctaTitle: {
    fontSize: Math.min(25, width * 0.07),
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  ctaText: {
    fontSize: Math.min(15, width * 0.04),
    color: '#334155',
    marginBottom: 18,
    lineHeight: Math.min(22, width * 0.055),
  },
});
