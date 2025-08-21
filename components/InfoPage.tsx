// components/InfoPage.tsx
import { Heart, Shield, Thermometer } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from './translations';
import type { AppState } from './types';

interface InfoPageProps {
  appState: AppState;
}

export function InfoPage({ appState }: InfoPageProps) {
  const t = useTranslation(appState.language);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>{t('info')}</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}><Heart size={20} color="#ef4444" /><Text style={styles.cardTitle}>{t('appIntro')}</Text></View>
        <View style={styles.cardContent}><Text style={styles.cardText}>{t('appDescription')}</Text></View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}><Shield size={20} color="#3b82f6" /><Text style={styles.cardTitle}>{t('safetyRules')}</Text></View>
        <View style={styles.cardContent}><Text style={styles.cardText}>{t('safetyRulesContent')}</Text></View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}><Thermometer size={20} color="#f97316" /><Text style={styles.cardTitle}>{t('tempGuide')}</Text></View>
        <View style={styles.cardContent}><Text style={styles.cardText}>{t('tempGuideContent')}</Text></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 16, paddingHorizontal: 16, paddingTop: 16 },
    card: { backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 16, marginHorizontal: 16 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16, borderBottomWidth: 1, borderColor: '#e5e7eb' },
    cardTitle: { fontSize: 18, fontWeight: '500' },
    cardContent: { padding: 16 },
    cardText: { fontSize: 14, color: '#4b5563', lineHeight: 20 }
});