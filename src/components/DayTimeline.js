import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
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
    
    const dateStr = date.toLocaleDateString('zh-CN');
    return records
      .filter(record => {
        const recordDate = new Date(record.timestamp);
        return recordDate.toLocaleDateString('zh-CN') === dateStr;
      })
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [records, date]);

  if (dayRecords.length === 0) {
    return null;
  }

  // 计算每个记录在24小时时间轴上的位置（百分比）
  const getPosition = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / (24 * 60)) * 100; // 24小时 = 1440分钟
  };

  // 生成小时标记（0-23点）
  const hourMarkers = Array.from({ length: 24 }, (_, i) => i);

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

      <View style={styles.timelineContainer}>
        {/* 24小时时间轴背景 */}
        <View style={styles.timelineBackground}>
          {/* 小时标记线 */}
          {hourMarkers.map((hour) => (
            <View
              key={hour}
              style={[
                styles.hourMarker,
                { left: `${(hour / 24) * 100}%` },
              ]}
            />
          ))}

          {/* 活动时间点 */}
          {dayRecords.map((record, index) => {
            const color = getTypeColor(record.type);
            const position = getPosition(record.timestamp);
            
            return (
              <View key={record.id} style={styles.recordContainer}>
                {/* 时间点标记 */}
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

                {/* 时间标签 */}
                <View
                  style={[
                    styles.timeLabel,
                    { left: `${position}%` },
                    position > 90 && styles.timeLabelRight, // 如果太靠右，调整位置
                  ]}
                >
                  <Text style={styles.timeText}>{formatTime(record.timestamp)}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* 活动时间段（显示每个活动的时间段） */}
        {dayRecords.map((record, index) => {
          const currentPosition = getPosition(record.timestamp);
          const color = getTypeColor(record.type);
          
          // 计算活动持续时间
          // 如果下一条记录存在且是相同类型，显示到下一个活动的时间段
          // 否则显示一个默认时间段（比如30分钟）
          let segmentWidth = 2; // 默认2%宽度（约30分钟）
          
          if (index < dayRecords.length - 1) {
            const nextRecord = dayRecords[index + 1];
            const nextPosition = getPosition(nextRecord.timestamp);
            
            if (record.type === nextRecord.type) {
              // 如果下一条是相同类型，连接到下一条
              segmentWidth = nextPosition - currentPosition;
            } else {
              // 如果下一条是不同类型，显示到中间点
              segmentWidth = Math.min((nextPosition - currentPosition) / 2, 5);
            }
          }
          
          return (
            <View
              key={`segment-${record.id}`}
              style={[
                styles.timeSegment,
                {
                  left: `${currentPosition}%`,
                  width: `${segmentWidth}%`,
                  backgroundColor: color + '60', // 60% 透明度，更明显
                },
              ]}
            />
          );
        })}
      </View>

      {/* 图例 */}
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
  timelineContainer: {
    position: 'relative',
    height: 80,
    marginBottom: 40,
  },
  timelineBackground: {
    position: 'relative',
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  hourMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#E0E0E0',
    transform: [{ translateX: -0.5 }],
  },
  recordContainer: {
    position: 'absolute',
    top: 0,
  },
  timePoint: {
    position: 'absolute',
    top: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -12 }],
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
