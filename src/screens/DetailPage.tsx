import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from '../translations/translations';
import { formatTemperature } from '../lib/utils';
import { AppState } from '../appState';

interface DetailPageProps {
  appState: AppState;
}

const DetailPage: React.FC<DetailPageProps> = ({ appState }) => {
  const t = useTranslation(appState.language);

  const getWalkStatus = (temp: number) => {
    if (temp <= 25) return "safe";
    if (temp <= 35) return "caution";
    return "danger";
  };
  const status = getWalkStatus(appState.asphaltTemp);

  const statusConfig = {
    safe: { color: "#22c55e", bgColor: "#dcfce7", textColor: "#16a34a", message: t("safeMessage"), icon: "check-circle" },
    caution: { color: "#eab308", bgColor: "#fffbeb", textColor: "#a16207", message: t("cautionMessage"), icon: "exclamation-triangle" },
    danger: { color: "#ef4444", bgColor: "#fef2f2", textColor: "#dc2626", message: t("dangerMessage"), icon: "times-circle" },
  };

  const StatusIcon = statusConfig[status].icon;

  const getTempRange = (minC: number | null, maxC: number | null) => {
    if (appState.unit === "F") {
      const minF = minC !== null ? ((minC * 9/5) + 32).toFixed(0) : null;
      const maxF = maxC !== null ? ((maxC * 9/5) + 32).toFixed(0) : null;
      if (minF && maxF) return `${minF}-${maxF}°F`;
      if (minF) return `> ${minF}°F`;
      if (maxF) return `< ${maxF}°F`;
    }
    if (minC && maxC) return `${minC}-${maxC}°C`;
    if (minC) return `> ${minC}°C`;
    if (maxC) return `< ${maxC}°C`;
    return "";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{t('detailInfo')}</Text>

      {/* 1. 危険度ステータスカード */}
      <View style={[styles.statusCard, { backgroundColor: statusConfig[status].bgColor }]}>
        <View style={styles.statusInnerContainer}>
          <View style={[styles.statusIconCircle, { backgroundColor: statusConfig[status].color }]}>
            <FontAwesome5 name={StatusIcon} size={24} color="white" />
          </View>
          <View>
            <Text style={[styles.statusBadge, { backgroundColor: statusConfig[status].color, color: 'white' }]}>
              {t(status)}
            </Text>
            <Text style={[styles.statusMessage, { color: statusConfig[status].textColor }]}>
              {statusConfig[status].message}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. 詳細データカード */}
      <View style={styles.detailsCard}>
        <View style={styles.detailsContent}>
          <View style={styles.tempHeader}>
            <FontAwesome5 name="thermometer-half" size={20} color="#ef4444" />
            <Text style={styles.tempTitle}>{t('asphaltTemp')}</Text>
          </View>
          <Text style={styles.asphaltTempValue}>
            {formatTemperature(appState.asphaltTemp, appState.unit)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.rowItem}>
              <FontAwesome5 name="sun" size={20} color="#f97316" />
              <Text style={styles.rowLabel}>{t('airTemp')}</Text>
            </View>
            <Text style={styles.rowValue}>
              {formatTemperature(appState.airTemp, appState.unit)}
            </Text>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.column}>
            <View style={styles.rowItem}>
              <FontAwesome5 name="tint" size={20} color="#3b82f6" />
              <Text style={styles.rowLabel}>{t('humidity')}</Text>
            </View>
            <Text style={styles.rowValue}>
              {appState.humidity.toFixed(0)}%
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.tipContainer}>
          <View style={styles.rowItem}>
            <FontAwesome5 name="lightbulb" size={20} color="#6b7280" />
            <Text style={styles.tipTitle}>{t('sevenSecondTestTitle')}</Text>
          </View>
          <Text style={styles.tipText}>
            {t('sevenSecondTestDesc')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
    gap: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statusCard: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    padding: 24,
  },
  statusInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusIconCircle: {
    padding: 12,
    borderRadius: 999,
  },
  statusBadge: {
    fontSize: 16,
    fontWeight: '500',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  statusMessage: {
    marginTop: 4,
    fontWeight: '500',
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  detailsContent: {
    padding: 20,
  },
  tempHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tempTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4b5563',
  },
  asphaltTempValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 8,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4b5563',
  },
  rowValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  tipContainer: {
    padding: 20,
    backgroundColor: '#f9fafb',
    gap: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  tipText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
});

export default DetailPage;