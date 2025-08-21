// components/SettingsPage.tsx
import { Bell, Globe, Thermometer } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../app/_layout';
import { useTranslation } from './translations';
import { Language } from './types';

export function SettingsPage() {
  const { appState, setAppState } = useAppContext();
  const t = useTranslation(appState.language);
  
  const languages = [
    { code: "en" as Language, name: "English", flag: "🇺🇸" },
    { code: "ko" as Language, name: "한국어", flag: "🇰🇷" },
    { code: "ja" as Language, name: "日本語", flag: "🇯🇵" },
    { code: "zh" as Language, name: "中文", flag: "🇨🇳" },
  ];
  
  const toggleDangerTempAlert = (value: boolean) => {
    setAppState(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        dangerTempAlert: value,
      },
    }));
  };

  const toggleWalkTimeAlert = (value: boolean) => {
    setAppState(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        walkTimeAlert: value,
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>{t('settings')}</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}><Bell size={20} color="#4b5563" /><Text style={styles.cardTitle}>{t('notifications')}</Text></View>
        <View style={styles.cardContent}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>{t('dangerTempAlert')}</Text>
              <Text style={styles.settingDesc}>{t('dangerTempDesc')}</Text>
            </View>
            <Switch 
              value={appState.notifications.dangerTempAlert} 
              onValueChange={toggleDangerTempAlert}
            />
          </View>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>{t('walkTimeAlert')}</Text>
              <Text style={styles.settingDesc}>{t('walkTimeDesc')}</Text>
            </View>
            <Switch 
              value={appState.notifications.walkTimeAlert} 
              onValueChange={toggleWalkTimeAlert}
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}><Thermometer size={20} color="#4b5563" /><Text style={styles.cardTitle}>{t('units')}</Text></View>
        <View style={styles.cardContent}>
          <TouchableOpacity 
            style={[styles.optionButton, appState.unit === 'C' && styles.optionButtonSelected]}
            onPress={() => setAppState(prev => ({ ...prev, unit: 'C' }))}
          >
            <Text>{t('celsius')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.optionButton, appState.unit === 'F' && styles.optionButtonSelected]}
            onPress={() => setAppState(prev => ({ ...prev, unit: 'F' }))}
          >
            <Text>{t('fahrenheit')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}><Globe size={20} color="#4b5563" /><Text style={styles.cardTitle}>{t('language')}</Text></View>
        <View style={styles.cardContent}>
          {languages.map(lang => (
            <TouchableOpacity 
              key={lang.code} 
              style={[styles.optionButton, appState.language === lang.code && styles.optionButtonSelected]}
              onPress={() => setAppState(prev => ({ ...prev, language: lang.code }))}
            >
              <Text>{lang.flag} {lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  cardContent: { padding: 16, gap: 16 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingLabel: { fontWeight: '500' },
  settingDesc: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  optionButton: { width: '100%', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 8 },
  optionButtonSelected: { borderColor: '#3b82f6', backgroundColor: '#eff6ff' }
});