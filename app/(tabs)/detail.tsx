// app/(tabs)/detail.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DetailPage } from '../../components/DetailPage';
import { useAppContext } from '../_layout';

export default function DetailScreen() {
  const { appState } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <DetailPage appState={appState} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});