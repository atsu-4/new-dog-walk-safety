// src/hooks/useBluetoothData.ts

import { useState, useEffect, useRef } from 'react';
import { AppState as RNAppState, AppStateStatus } from 'react-native';
import { BleManager, Device, Subscription, BleError } from 'react-native-ble-plx';
import { Buffer } from 'buffer'; // Buffer 라이브러리를 명시적으로 import
import { AppState, AppStateUpdate } from '../appState';

const RASPBERRY_PI_SERVICE_UUID = 'CE41F4D8-B48C-450A-AB57-4312E1A7B0DB';
const SENSOR_DATA_CHARACTERISTIC_UUID = '97C79DFA-1B95-41F6-A118-495F2445E889';

export const useBluetoothData = (
  appState: AppState,
  updateAppState: (updates: AppStateUpdate) => void
) => {
  const [isConnected, setIsConnected] = useState(false);
  // BleManager 인스턴스는 앱 전체에서 하나만 유지되어야 합니다.
  const manager = useRef(new BleManager()).current;
  // 현재 연결된 장치를 추적하기 위한 ref
  const deviceRef = useRef<Device | null>(null);
  // 컴포넌트가 화면에서 사라졌는지(unmount) 확인하는 ref
  const isUnmounted = useRef(false);

  useEffect(() => {
    isUnmounted.current = false;
    const subscriptions: Subscription[] = [];

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && !isUnmounted.current) {
        console.log('[BLE] 앱이 활성화되었습니다. 연결을 확인합니다.');
        checkConnectionAndScan();
      }
    };
    const appStateSub = RNAppState.addEventListener('change', handleAppStateChange);
    subscriptions.push({ remove: () => appStateSub.remove() });

    const bleStateSub = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        checkConnectionAndScan();
      } else {
        setIsConnected(false);
      }
    }, true);
    subscriptions.push(bleStateSub);

    const checkConnectionAndScan = async () => {
      if (deviceRef.current) {
        const isStillConnected = await deviceRef.current.isConnected();
        if (isStillConnected) {
          console.log(`[BLE] 이미 '${deviceRef.current.name}'에 연결되어 있습니다.`);
          return;
        }
      }
      if (!isUnmounted.current) {
        console.log('[BLE] 연결되지 않았습니다. 스캔을 시작합니다.');
        scanAndConnect();
      }
    };

    const scanAndConnect = () => {
      manager.startDeviceScan([RASPBERRY_PI_SERVICE_UUID], null, (error, device) => {
        if (error || !device) {
          console.error('[BLE] 스캔 오류:', error);
          return;
        }
        
        console.log(`[BLE] 기기 발견: ${device.name} (${device.id})`);
        manager.stopDeviceScan();
        deviceRef.current = device;
        connectToDevice(device);
      });
    };

    const connectToDevice = async (device: Device) => {
      try {
        const disconnectionSub = device.onDisconnected((error) => {
          if (isUnmounted.current) return;
          setIsConnected(false);
          deviceRef.current = null;
          console.log(`[BLE] '${device.name}'과(와)의 연결이 끊겼습니다. 다시 스캔합니다.`);
          // 연결이 끊기면 1초 후에 다시 스캔 시작 (너무 빠른 재시도 방지)
          setTimeout(checkConnectionAndScan, 1000);
        });
        subscriptions.push(disconnectionSub);

        console.log(`[BLE] '${device.name}'에 연결 중...`);
        await device.connect();

        // 연결 도중에 컴포넌트가 사라졌다면, 바로 연결을 끊고 함수를 종료합니다.
        if (isUnmounted.current) {
          await device.cancelConnection();
          return;
        }
        
        console.log(`[BLE] '${device.name}'에 연결 성공.`);
        await device.discoverAllServicesAndCharacteristics();
        monitorCharacteristic(device);
        setIsConnected(true);

      } catch (e) {
        const bleError = e as BleError;
        // "Operation was cancelled" 오류는 재연결 과정에서 자연스럽게 발생할 수 있으므로, 무시합니다.
        if (bleError.reason !== 'Operation was cancelled') {
            console.error(`[BLE] 연결 실패:`, bleError);
        }
      }
    };
    
    const monitorCharacteristic = (device: Device) => {
      const monitorSub = device.monitorCharacteristicForService(
        RASPBERRY_PI_SERVICE_UUID,
        SENSOR_DATA_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) { return; }
          if (characteristic?.value) {
            const decodedValue = Buffer.from(characteristic.value, 'base64').toString('utf8');
            try {
              const data = JSON.parse(decodedValue);
              updateAppState({
                asphaltTemp: data.bme_temp,
                airTemp: data.mlx_ambient,
                humidity: data.bme_hum,
                lastUpdated: new Date(),
              });
            } catch (jsonError) {
              console.error("[BLE] JSON 파싱 실패:", jsonError, "수신된 문자열:", decodedValue);
            }
          }
        }
      );
      subscriptions.push(monitorSub);
    };

    // 컴포넌트가 화면에서 사라질 때(unmount) 모든 리스너와 연결을 정리하는 cleanup 함수
    return () => {
      console.log('[BLE] Cleanup: 모든 구독과 연결을 정리합니다.');
      isUnmounted.current = true; // unmount 상태임을 표시
      subscriptions.forEach(sub => sub.remove());
      manager.stopDeviceScan();
      if (deviceRef.current) {
        deviceRef.current.cancelConnection();
      }
    };
  }, [manager, updateAppState]);

  return { isConnected };
};