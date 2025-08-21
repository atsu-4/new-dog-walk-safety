//_layout.tsx
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useState } from 'react';
import 'react-native-reanimated';
import { AppState } from '../components/types';
import { useNotifications } from '../hooks/useNotifications';


// AppContext 생성
interface AppContextType {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export default function RootLayout() {
  

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // 전역 상태 관리
  // app/_layout.tsx
  const [appState, setAppState] = useState<AppState>({
    language: "ko",
    unit: "C",
    asphaltTemp: 28.3,
    airTemp: 26,
    humidity: 45,
    isWalking: false,
    walkDuration: 0,
    walkStartTime: null,
    walkIntervalId: null,
    lastUpdated: new Date(),
    isConnected: true,
    connectionError: null,
    currentPage: 'dashboard',
    walkHistory: [],
    notifications: {
      dangerTempAlert: true,
      walkTimeAlert: true,
    },
  });

  const { registerForPushNotifications } = useNotifications();

  // 알림 권한 요청
  React.useEffect(() => {
    registerForPushNotifications();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppContext.Provider>
  );
}