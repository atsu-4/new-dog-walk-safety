// app/(tabs)/history.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HistoryPage } from '../../components/HistoryPage';
import { useAppContext } from '../_layout';

export default function HistoryScreen() {
  const { appState } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <HistoryPage appState={appState} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});