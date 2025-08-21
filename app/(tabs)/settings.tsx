// app/(tabs)/settings.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SettingsPage } from '../../components/SettingsPage';
import { useAppContext } from '../_layout';

export default function SettingsScreen() {
  const { appState, setAppState } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <SettingsPage appState={appState} setAppState={setAppState} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});