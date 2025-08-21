// hooks/useNotifications.ts
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// 알림 핸들러 설정
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true, // iOS에서 알림 배너 표시
      shouldShowList: true,   // iOS에서 알림 센터에 표시
    }),
  });

export const useNotifications = () => {
  // 알림 권한 요청
  const registerForPushNotifications = async () => {
    if (Platform.OS === 'ios') {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        alert('알림 권한을 얻지 못했습니다!');
        return false;
      }
    }
    return true;
  };

  // 위험 온도 알림
  const scheduleDangerAlert = async (temperature: number) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '위험 온도 경고',
        body: `노면 온도가 ${temperature}°C로 위험 수준입니다. 강아지 산책을 피해주세요.`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null, // 즉시 발송
    });
  };

  // 산책 시간 알림
  const scheduleWalkTimeAlert = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '산책 시간 알림',
        body: '산책 시간이 30분을 넘었습니다. 강아지의 상태를 확인해주세요.',
        sound: true,
      },
      trigger: null, // 즉시 발송
    });
  };

  // 알림 취소
  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return {
    registerForPushNotifications,
    scheduleDangerAlert,
    scheduleWalkTimeAlert,
    cancelAllNotifications,
  };
};