import { useRouter } from 'expo-router';
import { AlertCircle, Calendar, Clock, Thermometer } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../app/_layout';
import { useTranslation } from './translations';

export function HistoryPage() {
  const { appState, setAppState } = useAppContext();
  const t = useTranslation(appState.language);
  const router = useRouter();
  
  // 기록이 있는지 확인 (길이가 0보다 크면 기록이 있음)
  const hasReports = appState.walkHistory.length > 0;

  const goToHome = () => {
    // 현재 페이지를 dashboard로 설정하고 홈 페이지로 이동
    setAppState(prev => ({ ...prev, currentPage: 'dashboard' }));
    // Expo Router의 라우팅 구조에 따라 올바른 경로 사용
    router.push('/(tabs)');
  };

  // 기록이 없을 때만 빈 상태 화면 표시
  if (!hasReports) {
    return (
      <View style={styles.emptyContainer}>
        <AlertCircle size={48} color="#9ca3af" />
        <Text style={styles.emptyTitle}>{t("noWalksFound")}</Text>
        <Text style={styles.emptyText}>{t("startNewWalk")}</Text>
        <TouchableOpacity 
          style={styles.emptyButton}
          onPress={goToHome}
        >
          <Text style={styles.emptyButtonText}>{t("backToHome")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // 기록이 있을 때만 아래 코드 실행
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(appState.language === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>{t('history')}</Text>
      
      {appState.walkHistory.map((walk) => (
        <View key={walk.id} style={styles.walkCard}>
          <View style={styles.walkHeader}>
            <View style={styles.walkDate}>
              <Calendar size={16} color="#6b7280" />
              <Text style={styles.walkDateText}>{formatDate(walk.startTime)}</Text>
            </View>
            <View style={[styles.statusBadge, 
              {backgroundColor: 
                walk.status === 'safe' ? '#dcfce7' : 
                walk.status === 'caution' ? '#fef3c7' : '#fee2e2'
              }]}>
              <Text style={[
                styles.statusText, 
                {color: 
                  walk.status === 'safe' ? '#166534' : 
                  walk.status === 'caution' ? '#92400e' : '#991b1b'
                }]}>
                {t(walk.status)}
              </Text>
            </View>
          </View>
          
          <View style={styles.walkDetails}>
            <View style={styles.detailItem}>
              <Clock size={16} color="#6b7280" />
              <Text style={styles.detailLabel}>{t('duration')}:</Text>
              <Text style={styles.detailValue}>{formatDuration(walk.duration)}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Thermometer size={16} color="#6b7280" />
              <Text style={styles.detailLabel}>{t('asphaltTemp')}:</Text>
              <Text style={styles.detailValue}>{walk.avgAsphaltTemp.toFixed(1)}°C</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 16, paddingHorizontal: 16, paddingTop: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  emptyTitle: { marginTop: 8, fontSize: 18, fontWeight: '500', color: '#111827' },
  emptyText: { marginTop: 4, fontSize: 14, color: '#6b7280' },
  emptyButton: { marginTop: 24, backgroundColor: '#3b82f6', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  emptyButtonText: { color: 'white', fontWeight: '500' },
  walkCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  walkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  walkDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  walkDateText: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  walkDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});