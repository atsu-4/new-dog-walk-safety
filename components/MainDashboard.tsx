// MainDashboard.tsx
import { useRouter } from 'expo-router';
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Footprints,
  PlaySquare,
  Thermometer,
  XCircle
} from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../app/_layout';
import { translations, useTranslation } from './translations';
import { Unit, WalkHistoryItem } from './types';

const formatTemperature = (tempC: number, unit: Unit) => (unit === 'F' ? `${(tempC * 9/5 + 32).toFixed(1)}°F` : `${tempC.toFixed(1)}°C`);

const Progress = ({ value }: { value: number }) => (
  <View style={styles.progressContainer}>
    <View style={[styles.progressIndicator, { width: `${value}%` }]} />
  </View>
);

// getWalkStatus 함수를 컴포넌트 외부로 이동하고 반환 타입 명시
const getWalkStatus = (temp: number): 'safe' | 'caution' | 'danger' => {
  if (temp <= 25) return "safe";
  if (temp <= 35) return "caution";
  return "danger";
};

export function MainDashboard() {
  const { appState, setAppState } = useAppContext();
  const t = useTranslation(appState.language);
  const router = useRouter(); // router 사용
  
  // useRef를 사용하여 인터벌 ID 저장
  const walkIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  
  // status 계산
  const status = getWalkStatus(appState.asphaltTemp);

  const statusConfig: any = {
    safe: { color: "#22c55e", bgColor: "#f0fdf4", textColor: "#15803d", Icon: CheckCircle, recKey: 'safeRecommendations' },
    caution: { color: "#f59e0b", bgColor: "#fefce8", textColor: "#a16207", Icon: AlertTriangle, recKey: 'cautionRecommendations' },
    danger: { color: "#ef4444", bgColor: "#fef2f2", textColor: "#b91c1c", Icon: XCircle, recKey: 'dangerRecommendations' },
  };
  const currentStatus = statusConfig[status];
  const recRaw = translations[currentStatus.recKey][appState.language];
  const recommendations = Array.isArray(recRaw) ? recRaw : [recRaw];

  // 산책 시작/정지 함수
  const toggleWalk = () => {
    if (appState.isWalking) {
      // 산책 정지 및 기록 저장
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current);
        walkIntervalRef.current = null;
      }
      
      // 기록에 추가 (타입 명시)
      const newWalkRecord: WalkHistoryItem = {
        id: Date.now().toString(),
        startTime: appState.walkStartTime!,
        endTime: new Date(),
        duration: appState.walkDuration,
        avgAsphaltTemp: appState.asphaltTemp,
        maxAsphaltTemp: appState.asphaltTemp,
        avgAirTemp: appState.airTemp,
        status: getWalkStatus(appState.asphaltTemp),
      };
      
      setAppState(prev => ({
        ...prev,
        isWalking: false,
        walkDuration: 0,
        walkStartTime: null,
        walkHistory: [...prev.walkHistory, newWalkRecord],
      }));
    } else {
      // 산책 시작
      const startTime = new Date();
      setAppState(prev => ({
        ...prev,
        isWalking: true,
        walkStartTime: startTime,
        walkDuration: 0,
      }));
      
      // 산책 시간 업데이트 인터벌 설정
      walkIntervalRef.current = setInterval(() => {
        setAppState(prev => ({
          ...prev,
          walkDuration: prev.walkDuration + 1,
        }));
      }, 1000);
    }
  };

  // 컴포넌트 언마운트 시 인터벌 정리
  React.useEffect(() => {
    return () => {
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current);
      }
    };
  }, []);

  // 산책 시간 포맷팅
  const formatWalkTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const goToDetail = () => {
    // 현재 페이지를 detail로 설정하고 상세정보 페이지로 이동
    setAppState(prev => ({ ...prev, currentPage: 'detail' }));
    router.push('/detail');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Status Card */}
      <View style={[styles.card, { backgroundColor: currentStatus.bgColor }]}>
        <View style={styles.statusContent}>
          <View style={[styles.statusIconWrapper, { backgroundColor: currentStatus.color }]}>
            <currentStatus.Icon color="white" width={32} height={32} />
          </View>
          <View style={[styles.badge, { backgroundColor: currentStatus.color }]}>
            <Text style={styles.badgeText}>{t(status)}</Text>
          </View>
          <Text style={[styles.statusMessage, { color: currentStatus.textColor }]}>{t(`${status}Message`)}</Text>
        </View>
      </View>

      {/* Temperature & Walk Controls */}
      <View style={styles.row}>
        <View style={[styles.card, styles.flex1, styles.tempCard]}>
          <View style={styles.cardHeader}>
            <Thermometer size={16} color="#ef4444" />
            <Text style={styles.cardTitle}>{t('asphaltTemp')}</Text>
          </View>
          <Text style={styles.tempText}>{formatTemperature(appState.asphaltTemp, appState.unit)}</Text>
          <Progress value={Math.min((appState.asphaltTemp / 50) * 100, 100)} />
        </View>
        <TouchableOpacity 
          style={[styles.card, styles.flex1, styles.startWalkButton, 
                 { backgroundColor: appState.isWalking ? '#ef4444' : '#22c55e' }]}
          onPress={toggleWalk}
        >
          <PlaySquare size={32} color="white" />
          <Text style={styles.startWalkText}>
            {appState.isWalking ? t('stopWalk') : t('startWalk')}
          </Text>
          {appState.isWalking && (
            <Text style={styles.walkTimer}>{formatWalkTime(appState.walkDuration)}</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Recommendations */}
      <View style={styles.card}>
        <Text style={styles.recommendationsTitle}>{t('recommendations')}</Text>
        <View style={styles.recommendationsList}>
            {recommendations.map((rec: string, index: number) => (
                <View key={index} style={styles.recommendationItem}>
                    <Footprints size={16} color="#3b82f6" style={{flexShrink: 0}} />
                    <Text style={styles.recommendationText}>{rec}</Text>
                </View>
            ))}
        </View>
      </View>

      {/* Last Updated */}
      <Text style={styles.lastUpdatedText}>
        {t('lastUpdated')}: {appState.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>

      <TouchableOpacity 
        style={styles.detailsButton}
        onPress={goToDetail} // onPress 이벤트 추가
      >
        <Text style={styles.detailsButtonText}>{t('viewDetails')}</Text>
        <ChevronRight size={16} color="#6b7280" />
      </TouchableOpacity>

    </ScrollView>
  );
}

// 스타일은 동일하게 유지
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#f9fafb',
},
contentContainer: {
  padding: 16,
},
walkTimer:{
  fontSize: 14,
  color: 'white',
  marginTop: 4,
},
logoContainer: {
  alignItems: 'center',
  marginBottom: 20,
},
logo: {
  width: 100,
  height: 100,
},
exampleImage: {
  width: '100%',
  height: 150,
  marginVertical: 10,
},
smallImage: {
  width: 50,
  height: 50,
  alignSelf: 'center',
  marginVertical: 10,
},
card: {
  backgroundColor: 'white',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  marginBottom: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
},
statusContent: {
  padding: 24,
  alignItems: 'center',
},
statusIconWrapper: {
  padding: 16,
  borderRadius: 999,
  marginBottom: 16,
},
badge: {
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginBottom: 12,
},
badgeText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
},
statusMessage: {
  fontSize: 16,
  fontWeight: '500',
  textAlign: 'center',
},
row: {
  flexDirection: 'row',
  gap: 16,
},
flex1: {
  flex: 1,
},
tempCard: {
  padding: 16,
},
cardHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginBottom: 8,
},
cardTitle: {
  fontSize: 14,
  fontWeight: '500',
  color: '#4b5563',
},
tempText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#b91c1c',
  marginBottom: 8,
},
progressContainer: {
  height: 8,
  backgroundColor: 'rgba(239, 68, 68, 0.2)',
  borderRadius: 999,
  overflow: 'hidden',
},
progressIndicator: {
  height: '100%',
  backgroundColor: '#ef4444',
},
startWalkButton: {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 8,
},
startWalkText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 8,
},
recommendationsTitle: {
  fontWeight: '600',
  color: '#111827',
  marginBottom: 12,
  paddingHorizontal: 16,
  paddingTop: 16,
  fontSize: 18,
},
recommendationsList: {
  paddingHorizontal: 16,
  paddingBottom: 16,
},
recommendationItem: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginBottom: 8,
},
recommendationText: {
  fontSize: 14,
  color: '#374151',
  flex: 1,
},
detailsButton: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  paddingVertical: 10,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  backgroundColor: 'white',
},
detailsButtonText: {
  color: '#374151',
  marginRight: 8,
  fontWeight: '500',
},
lastUpdatedText: {
  fontSize: 12,
  color: '#6b7280',
  textAlign: 'center',
  marginTop: 16,
},
});