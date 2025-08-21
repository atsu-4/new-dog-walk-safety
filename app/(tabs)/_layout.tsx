// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BarChart3, Bell, Clock, Home, Info, Settings } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useTranslation } from '../../components/translations';
import { useAppContext } from '../_layout';

export default function TabLayout() {
  const { appState } = useAppContext();
  const t = useTranslation(appState.language);

  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#2563eb',
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500', marginTop: -5, paddingBottom: 5 },
          tabBarIconStyle: { marginTop: 5 },
          tabBarStyle: { height: 60 },
          headerStyle: { backgroundColor: '#ffffff', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
          headerTitleStyle: { color: '#111827', fontWeight: 'bold' },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Image
              source={require('../../assets/images/SDGs.png')}
              style={{ width: 32, height: 32, marginLeft: 16 }}
              accessibilityLabel={t('sdgsLogo')}
            />
          ),
          headerRight: () => (
            <TouchableOpacity 
              style={{ marginRight: 16 }}
              accessibilityLabel={t('notifications')}
            >
              <Bell color="#4b5563" size={24} />
            </TouchableOpacity>
          ),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: t('dogWalkSafety'),
            tabBarIcon: ({ color, size }) => <Home color={color} size={size * 1.1} />,
            tabBarLabel: t('dashboard'),
          }}
        />
        <Tabs.Screen 
          name="detail" 
          options={{ 
            title: t('detail'),
            tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size * 1.1} />,
            tabBarLabel: t('detail'),
          }} 
        />
        <Tabs.Screen 
          name="history" 
          options={{ 
            title: t('history'),
            tabBarIcon: ({ color, size }) => <Clock color={color} size={size * 1.1} />,
            tabBarLabel: t('history'),
          }} 
        />
        <Tabs.Screen 
          name="settings" 
          options={{ 
            title: t('settings'),
            tabBarIcon: ({ color, size }) => <Settings color={color} size={size * 1.1} />,
            tabBarLabel: t('settings'),
          }} 
        />
        <Tabs.Screen 
          name="info" 
          options={{ 
            title: t('info'),
            tabBarIcon: ({ color, size }) => <Info color={color} size={size * 1.1} />,
            tabBarLabel: t('info'),
          }} 
        />
      </Tabs>
    </>
  );
}