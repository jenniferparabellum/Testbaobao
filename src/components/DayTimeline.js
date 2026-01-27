import React, { useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getTypeColor = (type) => {
  switch (type) {
    case 'feeding':
      return '#FF6B9D';
    case 'sleeping':
      return '#4ECDC4';
    case 'diaper':
      return '#FFE66D';
    default:
      return '#95A5A6';
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case 'feeding':
      return '吃饭';
    case 'sleeping':
      return '睡觉';
    case 'diaper':
      return '换尿布';
    default:
      return type;
  }
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function DayTimeline({ records, date }) {
  // 筛选该日期的记录并按时间排序
  const dayRecords = useMemo(() => {
    if (!records || records.length === 0) return [];
    if (!date) return [];

    // 确保date是有效的Date对象
    const targetDate = date instanceof Date ? date : new Date(date);
    if (isNaN(targetDate.getTime())) {
      console.warn('Invalid date passed to DayTimeline:', date);
      return [];
    }

    // 获取目标日期的年月日（使用UTC避免时区问题）
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    const targetDay = targetDate.getDate();

    const filtered = records
      .filter(record => {
        try {
          if (!record || !record.timestamp) {
            return false;
          }

          const recordDate = new Date(record.timestamp);
          if (isNaN(recordDate.getTime())) {
            console.warn('Invalid record timestamp:', record.timestamp);
            return false;
          }

          // 比较年月日，忽略时分秒
          const match = (
            recordDate.getFullYear() === targetYear &&
            recordDate.getMonth() === targetMonth &&
            recordDate.getDate() === targetDay
          );

          return match;
        } catch (error) {
          console.error('Error filtering record:', error, record);
          return false;
        }
      })
      .sort((a, b) => {
        try {
          const timeA = new Date(a.timestamp).getTime();
          const timeB = new Date(b.timestamp).getTime();
          return timeA - timeB;
        } catch (error) {
          return 0;
        }
      });

    // 调试信息
    if (__DEV__) {
      console.log('DayTimeline filtering:', {
        targetDate: `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`,
        targetDateObj: targetDate.toLocaleDateString('zh-CN'),
        totalRecords: records.length,
        filteredCount: filtered.length,
        firstRecord: filtered[0] ? {
          timestamp: filtered[0].timestamp,
          date: new Date(filtered[0].timestamp).toLocaleDateString('zh-CN'),
          hours: new Date(filtered[0].timestamp).getHours(),
          minutes: new Date(filtered[0].timestamp).getMinutes(),
        } : null,
      });

      // 如果筛选结果为空，显示一些示例记录的时间戳
      if (filtered.length === 0 && records.length > 0) {
        console.warn('DayTimeline: No records matched for date:', {
          targetDate: `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`,
          sampleRecords: records.slice(0, 3).map(r => ({
            timestamp: r.timestamp,
            date: new Date(r.timestamp).toLocaleDateString('zh-CN'),
            year: new Date(r.timestamp).getFullYear(),
            month: new Date(r.timestamp).getMonth(),
            day: new Date(r.timestamp).getDate(),
          })),
        });
      }
    }

    return filtered;
  }, [records, date]);

  if (dayRecords.length === 0) {
    return null;
  }

  // 计算每个记录在24小时时间轴上的位置（百分比）
  const isMobile = Platform.OS !== 'web';

  const createSectionRecords = (recordsList, startHour, endHour) => {
    const rangeRecords = recordsList
      .map((record) => ({
        ...record,
        __date: new Date(record.timestamp),
      }))
      .filter(({ __date }) => {
        const hour = __date.getHours();
        return hour >= startHour && hour <= endHour;
      })
      .sort((a, b) => a.__date - b.__date);

    return rangeRecords;
  };

  const computePosition = (recordDate, startHour, totalMinutes) => {
    const hours = recordDate.getHours();
    const minutes = recordDate.getMinutes();
    const seconds = recordDate.getSeconds();
    const elapsedMinutes = (hours - startHour) * 60 + minutes + seconds / 60;
    const ratio = elapsedMinutes / totalMinutes;
    return Math.max(0, Math.min(100, ratio * 100));
  };

  const renderTimelineSection = ({
    sectionRecords,
    startHour,
    endHour,
    label,
    isMobileSection = false,
  }) => {
    const totalMinutes = (endHour - startHour + 1) * 60;
    const hourMarkers = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
    const labelStep = isMobileSection ? 3 : 1;
    const visibleHourLabels = hourMarkers.filter(
      (hour) => hour === startHour || hour === endHour || hour % labelStep === 0
    );

    const containerStyle = isMobileSection ? styles.mobileTimelineContainer : styles.webTimelineContainer;
    const hourLabelTextStyle = isMobileSection
      ? [styles.hourLabelText, styles.hourLabelTextCompact]
      : styles.hourLabelText;

    return (
      <View style={styles.timelineSectionWrapper}>
        {label && <Text style={[styles.sectionLabel, isMobileSection && styles.sectionLabelMobile]}>{label}</Text>}
        <View style={[styles.timelineSectionBackground, containerStyle]}>
          {hourMarkers.map((hour) => (
            <View
              key={`marker-${label || 'full'}-${hour}`}
              style={[
                styles.hourMarker,
                { left: `${((hour - startHour) / (endHour - startHour)) * 100}%` },
              ]}
            />
          ))}
          <View style={styles.hourLabels}>
            {visibleHourLabels.map((hour) => (
              <View
                key={`label-${label || 'full'}-${hour}`}
                style={[
                  styles.hourLabel,
                  { left: `${((hour - startHour) / (endHour - startHour)) * 100}%` },
                  hour === startHour && styles.hourLabelLeft,
                  hour === endHour && styles.hourLabelRight,
                ]}
              >
                <Text style={hourLabelTextStyle}>{`${hour}:00`}</Text>
              </View>
            ))}
          </View>
          {sectionRecords.map((record, index) => {
            const color = getTypeColor(record.type);
            const position = computePosition(record.__date, startHour, totalMinutes);

            return (
              <View key={`point-${record.id}-${label}`} style={styles.recordContainer}>
                <View
                  style={[
                    styles.timePoint,
                    { backgroundColor: color },
                    { left: `${position}%` },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={
                      record.type === 'feeding'
                        ? 'baby-bottle'
                        : record.type === 'sleeping'
                          ? 'sleep'
                          : 'baby-face-outline'
                    }
                    size={12}
                    color="#FFFFFF"
                  />
                </View>
                <View
                  style={[
                    styles.timeLabel,
                    { left: `${position}%` },
                    position > 90 && styles.timeLabelRight,
                  ]}
                >
                  <Text style={styles.timeText}>{formatTime(record.timestamp)}</Text>
                </View>
              </View>
            );
          })}
        </View>
        {sectionRecords.map((record, index) => {
          const currentPosition = computePosition(record.__date, startHour, totalMinutes);
          const color = getTypeColor(record.type);
          let segmentWidth = 2;
          if (index < sectionRecords.length - 1) {
            const nextPosition = computePosition(
              sectionRecords[index + 1].__date,
              startHour,
              totalMinutes
            );
            if (record.type === sectionRecords[index + 1].type) {
              segmentWidth = Math.max(2, nextPosition - currentPosition);
            } else {
              segmentWidth = Math.min((nextPosition - currentPosition) / 2, 5);
            }
          }

          return (
            <View
              key={`segment-${record.id}-${label}`}
              style={[
                styles.timeSegment,
                {
                  left: `${currentPosition}%`,
                  width: `${segmentWidth}%`,
                  backgroundColor: color + '60',
                  top: isMobileSection ? 28 : 22,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const amRecords = createSectionRecords(dayRecords, 0, 11);
  const pmRecords = createSectionRecords(dayRecords, 12, 23);

  const fullDayRecords = createSectionRecords(dayRecords, 0, 23);
  const timelineContent = isMobile ? (
    <View style={styles.mobileTimelineWrapper}>
      {renderTimelineSection({
        sectionRecords: amRecords,
        startHour: 0,
        endHour: 11,
        label: '0:00 AM - 11:59 AM',
        isMobileSection: true,
      })}
      {renderTimelineSection({
        sectionRecords: pmRecords,
        startHour: 12,
        endHour: 23,
        label: '12:00 PM - 11:59 PM',
        isMobileSection: true,
      })}
    </View>
  ) : (
    renderTimelineSection({
      sectionRecords: fullDayRecords,
      startHour: 0,
      endHour: 23,
      label: null,
      isMobileSection: false,
    })
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateLabel}>
          {date.toLocaleDateString('zh-CN', {
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </Text>
        <Text style={styles.recordCount}>{dayRecords.length} 条记录</Text>
      </View>

      {timelineContent}

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF6B9D' }]} />
          <Text style={styles.legendText}>吃饭</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
          <Text style={styles.legendText}>睡觉</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFE66D' }]} />
          <Text style={styles.legendText}>换尿布</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  recordCount: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  timelineSectionWrapper: {
    marginBottom: 16,
  },
  timelineSectionBackground: {
    position: 'relative',
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  webTimelineContainer: {
    marginBottom: 10,
    height: 40,
  },
  mobileTimelineContainer: {
    marginBottom: 6,
    height: 40,
  },
  mobileTimelineWrapper: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 6,
  },
  sectionLabelMobile: {
    fontSize: 11,
  },
  hourMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#E0E0E0',
    transform: [{ translateX: -0.5 }],
  },
  hourLabels: {
    position: 'absolute',
    top: 42,
    left: 0,
    right: 0,
    height: 20,
  },
  hourLabel: {
    position: 'absolute',
    transform: [{ translateX: -15 }],
    minWidth: 28,
  },
  hourLabelLeft: {
    transform: [{ translateX: 0 }],
  },
  hourLabelRight: {
    transform: [{ translateX: -30 }],
  },
  hourLabelText: {
    fontSize: 9,
    color: '#95A5A6',
    fontWeight: '500',
  },
  hourLabelTextCompact: {
    fontSize: 7.5,
  },
  recordContainer: {
    position: 'absolute',
    top: 0,
  },
  timePoint: {
    position: 'absolute',
    top: 8, // 调整位置使图标中心对齐时间轴中心 (40/2 - 24/2 = 8)
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -12 }], // 图标宽度24px，向左偏移12px使中心对齐
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  timeLabel: {
    position: 'absolute',
    top: 38,
    transform: [{ translateX: -30 }],
    minWidth: 60,
  },
  timeLabelRight: {
    transform: [{ translateX: -60 }],
  },
  timeText: {
    fontSize: 10,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  timeSegment: {
    position: 'absolute',
    top: 22,
    height: 4,
    borderRadius: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
});
