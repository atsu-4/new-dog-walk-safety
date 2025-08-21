// types.ts
export type Language = 'ko' | 'en' | 'ja' | 'zh';
export type Unit = 'C' | 'F';
export type Page = 'dashboard' | 'detail' | 'history' | 'settings' | 'info';

export interface AppState {
  language: Language;
  unit: Unit;
  asphaltTemp: number;
  airTemp: number;
  humidity: number;
  isWalking: boolean;
  walkDuration: number;
  walkStartTime: Date | null;
  walkIntervalId: NodeJS.Timeout | null;
  lastUpdated: Date;
  isConnected: boolean;
  connectionError: string | null;
  currentPage: Page;
  walkHistory: WalkHistoryItem[];
  notifications: {
    dangerTempAlert: boolean;
    walkTimeAlert: boolean;
  };
}

export interface Translations {
  [key: string]: {
    [lang in Language]: string | string[];
  };
}

export interface WalkHistoryItem {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number; // seconds
  avgAsphaltTemp: number;
  maxAsphaltTemp: number;
  avgAirTemp: number;
  status: 'safe' | 'caution' | 'danger';
}