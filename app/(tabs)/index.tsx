// app/(tabs)/index.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MainDashboard } from '../../components/MainDashboard';
import { useAppContext } from '../_layout';

export default function HomeScreen() {
  const { appState } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <MainDashboard appState={appState} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});