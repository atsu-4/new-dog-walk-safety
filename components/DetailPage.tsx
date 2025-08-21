// components/DetailPage.tsx
import { AlertTriangle, CheckCircle, Droplets, Lightbulb, Sun, Thermometer, XCircle } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from './translations';
import type { AppState } from './types';

const formatTemperature = (tempC: number, unit: string) => (unit === 'F' ? `${(tempC * 9/5 + 32).toFixed(1)}°F` : `${tempC.toFixed(1)}°C`);

// Progress Bar 컴포넌트
const Progress = ({ value }: { value: number }) => (
  <View style={styles.progressContainer}><View style={[styles.progressIndicator, { width: `${value}%` }]} /></View>
);

interface DetailPageProps {
  appState: AppState;
}

export function DetailPage({ appState }: DetailPageProps) {
  const t = useTranslation(appState.language);

  const getWalkStatus = (temp: number) => {
    if (temp <= 25) return "safe";
    if (temp <= 35) return "caution";
    return "danger";
  };
  const status = getWalkStatus(appState.asphaltTemp);
  
  const statusConfig: any = {
    safe: { color: "#22c55e", bgColor: "#f0fdf4", textColor: "#15803d", Icon: CheckCircle },
    caution: { color: "#f59e0b", bgColor: "#fefce8", textColor: "#a16207", Icon: AlertTriangle },
    danger: { color: "#ef4444", bgColor: "#fef2f2", textColor: "#b91c1c", Icon: XCircle },
  };
  const currentStatus = statusConfig[status];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>{t('detailInfo')}</Text>

      {/* Status Card */}
      <View style={[styles.card, { backgroundColor: currentStatus.bgColor, borderColor: currentStatus.color, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 16 }]}>
        <View style={[styles.statusIconWrapper, { backgroundColor: currentStatus.color }]}>
          <currentStatus.Icon color="white" width={24} height={24} />
        </View>
        <View>
          <View style={[styles.badge, { backgroundColor: currentStatus.color }]}><Text style={styles.badgeText}>{t(status)}</Text></View>
          <Text style={{ color: currentStatus.textColor, fontWeight: '500' }}>{t(`${status}Message`)}</Text>
        </View>
      </View>
      
      {/* Detailed Data Card */}
      <View style={styles.card}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Thermometer size={20} color="#ef4444" />
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#374151' }}>{t("asphaltTemp")}</Text>
          </View>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#dc2626', marginBottom: 12 }}>{formatTemperature(appState.asphaltTemp, appState.unit)}</Text>
          <Progress value={(appState.asphaltTemp / 50) * 100} />
        </View>
        <View style={styles.separator} />
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.gridCell, { borderRightWidth: 1, borderColor: '#e5e7eb' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}><Sun size={20} color="#f97316" /><Text style={styles.cardTitle}>{t("airTemp")}</Text></View>
            <Text style={styles.gridValue}>{formatTemperature(appState.airTemp, appState.unit)}</Text>
          </View>
          <View style={styles.gridCell}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Droplets size={20} color="#3b82f6" />
              <Text style={styles.cardTitle}>{t("humidity")}</Text>
            </View>
            <Text style={styles.gridValue}>{appState.humidity}%</Text> 
          </View>
        </View>
        <View style={styles.separator} />
        <View style={{ padding: 20, backgroundColor: '#f9fafb' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}><Lightbulb size={20} color="#6b7280" /><Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>{t("sevenSecondTestTitle")}</Text></View>
          <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20 }}>{t("sevenSecondTestDesc")}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 16, paddingHorizontal: 16, paddingTop: 16 },
  card: { backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 16, marginHorizontal: 16 },
  statusIconWrapper: { padding: 12, borderRadius: 999 },
  badge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, marginBottom: 4, alignSelf: 'flex-start' },
  badgeText: { color: 'white', fontSize: 14, fontWeight: '500' },
  separator: { height: 1, backgroundColor: '#e5e7eb' },
  gridCell: { flex: 1, padding: 20, justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '500', color: '#4b5563' },
  gridValue: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },
  progressContainer: { height: 8, backgroundColor: 'rgba(239, 68, 68, 0.2)', borderRadius: 999, overflow: 'hidden' },
  progressIndicator: { height: '100%', backgroundColor: '#ef4444' },
});