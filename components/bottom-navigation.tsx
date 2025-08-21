// components/BottomNavigation.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../app/_layout';
import { PlatformIcon } from './PlatformIcon';
import { useTranslation } from './translations';
import { Page } from './types';

// 네비게이션 항목 인터페이스 정의
interface NavItem {
  id: Page;
  icon: string;
  label: string;
  path: string;
}

export function BottomNavigation() {
  const { appState, setAppState } = useAppContext();
  const t = useTranslation(appState.language);
  const router = useRouter();

  // NavItem 타입을 사용하여 navItems 배열 정의
  const navItems: NavItem[] = [
    { id: "dashboard", icon: "home", label: t("dashboard"), path: "/" },
    { id: "detail", icon: "bar-chart", label: t("detail"), path: "/detail" },
    { id: "history", icon: "time", label: t("history"), path: "/history" },
    { id: "settings", icon: "settings", label: t("settings"), path: "/settings" },
    { id: "info", icon: "information-circle", label: t("info"), path: "/info" },
  ];

  const navigateToPage = (pageId: Page, path: string) => {
    setAppState(prev => ({ ...prev, currentPage: pageId }));
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {navItems.map((item) => {
          const isActive = appState.currentPage === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigateToPage(item.id, item.path)}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              accessibilityLabel={item.label}
              accessibilityRole="button"
            >
              <PlatformIcon 
                name={item.icon} 
                size={20} 
                color={isActive ? "#3b82f6" : "#6b7280"} 
              />
              <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// 스타일은 동일하게 유지
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeNavItem: {
    backgroundColor: '#eff6ff',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#6b7280',
  },
  activeNavLabel: {
    color: '#3b82f6',
    fontWeight: '500',
  },
});