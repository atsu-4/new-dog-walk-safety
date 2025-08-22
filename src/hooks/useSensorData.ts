// src/hooks/useSensorData.ts

import { useEffect, useRef } from 'react';
import { AppState, AppStateUpdate } from '../appState';

const RASPBERRY_PI_IP = '172.20.10.10';
const SENSOR_API_URL = `http://${RASPBERRY_PI_IP}:8000/api/sensors/data/`;

export const useSensorData = (
  updateAppState: (updates: AppStateUpdate) => void
) => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`[API] ${SENSOR_API_URL} 로 데이터 요청 중...`);
        const response = await fetch(SENSOR_API_URL);

        if (!response.ok) {
          console.error(`[API] 서버 응답 오류: ${response.status}`);
          return;
        }
        
        const data = await response.json();
        console.log('[API] 데이터 수신 성공:', data);

        // ★★★ 핵심 수정 사항 ★★★
        // 서버에서 보낸 중첩된 데이터 구조에 맞게 올바른 경로에서 값을 가져옵니다.
        updateAppState({
          asphaltTemp: data.mlx90614.object_temperature,
          airTemp: data.bme280.temperature,
          humidity: data.bme280.humidity,
          lastUpdated: new Date(),
        });
        console.log('[API] 앱 상태 업데이트 성공!');

      } catch (error) {
        console.error('[API] 데이터 요청 실패:', error);
      }
    };

    fetchData();
    intervalId.current = setInterval(fetchData, 5000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [updateAppState]);

  return {};
};