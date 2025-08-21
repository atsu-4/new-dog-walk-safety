import { useState, useEffect } from 'react';
import { BleManager, Device, Characteristic, BleError } from 'react-native-ble-plx';
import { AppState, AppStateUpdate } from '../appState';

// サービスとキャラクタリスティックのUUIDを定義
const RASPBERRY_PI_SERVICE_UUID = 'CE41F4D8-B48C-450A-AB57-4312E1A7B0DB';
const SENSOR_DATA_CHARACTERISTIC_UUID = '97C79DFA-1B95-41F6-A118-495F2445E889';

export const useBluetoothData = (
  appState: AppState,
  updateAppState: (updates: AppStateUpdate) => void
) => {
  const [isConnected, setIsConnected] = useState(false);
  const manager = new BleManager();

  useEffect(() => {
    const connectToDevice = async () => {
      try {
        console.log('Scanning for devices...');
        
        // デバイススキャンをPromiseでラップする
        const device: Device = await new Promise((resolve, reject) => {
          let foundDevice: Device | null = null;
          manager.startDeviceScan([RASPBERRY_PI_SERVICE_UUID], null, (error, scannedDevice) => {
            if (error) {
              manager.stopDeviceScan();
              reject(error);
              return;
            }

            if (scannedDevice && scannedDevice.serviceUUIDs?.includes(RASPBERRY_PI_SERVICE_UUID)) {
              console.log(`Found device ${scannedDevice.name}`);
              manager.stopDeviceScan();
              resolve(scannedDevice);
            }
          });
          // タイムアウトを設定
          setTimeout(() => {
            manager.stopDeviceScan();
            if (!foundDevice) {
              reject('Device not found within scan time.');
            }
          }, 5000);
        });

        console.log(`Connecting to ${device.name}...`);
        const connectedDevice = await device.connect();
        await connectedDevice.discoverAllServicesAndCharacteristics();
        setIsConnected(true);

        // データの通知（Notify）を購読
        connectedDevice.monitorCharacteristicForService(
          RASPBERRY_PI_SERVICE_UUID,
          SENSOR_DATA_CHARACTERISTIC_UUID,
          (error: BleError | null, characteristic: Characteristic | null) => {
            if (error) {
              console.error('Characteristic monitor error:', error);
              return;
            }

            if (characteristic?.value) {
              // Base64エンコードされたデータをデコード
              const decodedValue = Buffer.from(characteristic.value, 'base64').toString();
              try {
                // JSON文字列をパース
                const data = JSON.parse(decodedValue);
                // 受信したJSONデータでアプリの状態を更新
                updateAppState({
                  asphaltTemp: data.bme_temp,
                  airTemp: data.mlx_ambient,
                  humidity: data.bme_hum,
                  lastUpdated: new Date(),
                });
              } catch (e) {
                console.error("Failed to parse JSON:", e);
              }
            }
          }
        );
      } catch (e) {
        console.error('Bluetooth error:', e);
        setIsConnected(false);
      }
    };

    connectToDevice();

    return () => {
      manager.destroy();
    };
  }, []);

  return { isConnected };
};