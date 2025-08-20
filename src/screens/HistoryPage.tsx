import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from '../translations/translations';
import { AppState, WalkReport, AppStateUpdate } from '../appState';

interface HistoryPageProps {
  appState: AppState;
  updateAppState: (updates: AppStateUpdate) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ appState, updateAppState }) => {
  const t = useTranslation(appState.language);
  const [reports, setReports] = useState<WalkReport[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [memo, setMemo] = useState("");
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [memoBeforeEdit, setMemoBeforeEdit] = useState("");

  useEffect(() => {
    const loadReports = async () => {
      try {
        const storedReportsJSON = await AsyncStorage.getItem('walkReports');
        if (storedReportsJSON) {
          const storedReports: WalkReport[] = JSON.parse(storedReportsJSON);
          setReports(storedReports);
          if (storedReports.length > 0) {
            setMemo(storedReports[0].memo || "");
          }
        }
      } catch (e) {
        console.error("Failed to load walk reports:", e);
      }
    };
    loadReports();
  }, []);

  useEffect(() => {
    if (reports.length > 0 && reports[currentIndex]) {
      setMemo(reports[currentIndex].memo || "");
      setIsEditingMemo(false);
    }
  }, [currentIndex, reports]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(reports.length - 1, prevIndex + 1));
  };

  const handleSaveMemo = async () => {
    const updatedReports = reports.map((report, index) => {
      if (index === currentIndex) {
        return { ...report, memo: memo };
      }
      return report;
    });
    setReports(updatedReports);
    try {
      await AsyncStorage.setItem('walkReports', JSON.stringify(updatedReports));
    } catch (e) {
      console.error("Failed to save memo:", e);
    }
    setIsEditingMemo(false);
  };

  const handleEditClick = () => {
    setMemoBeforeEdit(memo);
    setIsEditingMemo(true);
  };

  const handleCancelEdit = () => {
    setMemo(memoBeforeEdit);
    setIsEditingMemo(false);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(appState.language);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString(appState.language);
  };
  
  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    const parts = [];
    if (h > 0) parts.push(`${h}${t('hours')}`);
    if (m > 0) parts.push(`${m}${t('minutes')}`);
    if (s > 0 || (h === 0 && m === 0)) parts.push(`${s}${t('seconds')}`);

    return parts.join(' ');
  };

  const currentReport = reports[currentIndex];

  if (!currentReport) {
    return (
      <View style={styles.noWalksContainer}>
        <FontAwesome5 name="exclamation-circle" size={48} color="#9ca3af" />
        <Text style={styles.noWalksTitle}>{t("noWalksFound")}</Text>
        <Text style={styles.noWalksText}>{t("startNewWalk")}</Text>
        <TouchableOpacity 
          style={styles.backToHomeButton} 
          onPress={() => updateAppState({ currentPage: 'dashboard' })}
        >
          <Text style={styles.backToHomeButtonText}>{t("backToHome")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const chartData = [
    { name: t('safeTime'), value: currentReport.safeTime, color: '#22c55e' },
    { name: t('cautionTime'), value: currentReport.cautionTime, color: '#f59e0b' },
    { name: t('dangerTime'), value: currentReport.dangerTime, color: '#ef4444' },
  ].filter(item => item.value > 0);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>{t("history")}</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0}>
              <FontAwesome5 name="chevron-left" size={24} color={currentIndex === 0 ? '#d1d5db' : '#4b5563'} />
            </TouchableOpacity>
            
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formatDate(currentReport.startTime)}</Text>
              <Text style={styles.timeText}>
                {formatTime(currentReport.startTime)} ~ {formatTime(currentReport.endTime)}
              </Text>
            </View>

            <TouchableOpacity onPress={handleNext} disabled={currentIndex === reports.length - 1}>
              <FontAwesome5 name="chevron-right" size={24} color={currentIndex === reports.length - 1 ? '#d1d5db' : '#4b5563'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.cardContent}>
            {/* TODO: rechartの代わりにモバイル対応のチャートをここに配置 */}
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartText}>Pie Chart Placeholder</Text>
            </View>
            
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t('totalDuration')}</Text>
                <Text style={styles.summaryValue}>{formatDuration(currentReport.duration)}</Text>
              </View>
              {chartData.map((item, index) => (
                <View key={index} style={styles.summaryRow}>
                  <View style={styles.itemColorContainer}>
                    <View style={[styles.itemColor, { backgroundColor: item.color }]} />
                    <Text>{item.name}</Text>
                  </View>
                  <Text style={styles.summaryValue}>{formatDuration(item.value)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.divider} />

            <View style={styles.memoSection}>
              <View style={styles.memoHeader}>
                <View style={styles.memoTitleContainer}>
                  <FontAwesome5 name="edit" size={20} color="#4b5563" />
                  <Text style={styles.memoTitle}>{t("walkMemo")}</Text>
                </View>
                {!isEditingMemo && (
                  <TouchableOpacity onPress={handleEditClick} style={styles.editButton}>
                    <Text style={styles.editButtonText}>{t("edit")}</Text>
                  </TouchableOpacity>
                )}
              </View>

              {isEditingMemo ? (
                <View>
                  <TextInput
                    style={styles.memoInput}
                    placeholder={t("memoPlaceholder")}
                    value={memo}
                    onChangeText={setMemo}
                    multiline
                  />
                  <View style={styles.memoButtons}>
                    <TouchableOpacity onPress={handleSaveMemo} style={styles.saveButton}>
                      <Text style={styles.saveButtonText}>{t("save")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelEdit} style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>{t("cancel")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.memoDisplay}>
                  <Text style={styles.memoText}>{memo || t("noMemoYet")}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  cardContent: {
    padding: 16,
  },
  chartPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  chartText: {
    color: '#6b7280',
  },
  summaryContainer: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemColorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemColor: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  memoSection: {
    gap: 8,
  },
  memoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  memoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 12,
    color: '#4b5563',
  },
  memoInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    minHeight: 100,
    padding: 12,
    fontSize: 14,
    color: '#4b5563',
    textAlignVertical: 'top',
    marginTop: 8,
  },
  memoButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#4b5563',
    fontSize: 14,
  },
  memoDisplay: {
    minHeight: 100,
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  memoText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  noWalksContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  noWalksTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937',
    marginTop: 8,
  },
  noWalksText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  backToHomeButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  backToHomeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryPage;