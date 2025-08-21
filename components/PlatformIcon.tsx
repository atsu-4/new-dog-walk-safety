// components/PlatformIcon.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';

// Lucide 아이콘 (웹용)
import {
    BarChart3 as ChartLucide,
    Clock as ClockLucide,
    Home as HomeLucide,
    Info as InfoLucide,
    Settings as SettingsLucide
} from 'lucide-react-native';

interface PlatformIconProps {
  name: string;
  size: number;
  color: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ name, size, color }) => {
  if (Platform.OS === 'web') {
    // 웹용 Lucide 아이콘
    switch (name) {
      case 'home': return <HomeLucide size={size} color={color} />;
      case 'bar-chart': return <ChartLucide size={size} color={color} />;
      case 'time': return <ClockLucide size={size} color={color} />;
      case 'settings': return <SettingsLucide size={size} color={color} />;
      case 'information-circle': return <InfoLucide size={size} color={color} />;
      default: return null;
    }
  } else {
    // 네이티브용 Expo 아이콘
    return <Ionicons name={name as any} size={size} color={color} />;
  }
};