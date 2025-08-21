// app/(tabs)/info.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { InfoPage } from '../../components/InfoPage';
import { useAppContext } from '../_layout';

export default function InfoScreen() {
  const { appState } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <InfoPage appState={appState} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});