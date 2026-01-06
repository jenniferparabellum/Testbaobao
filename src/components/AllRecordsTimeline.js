import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function AllRecordsTimeline({ records }) {
  // 按时间排序所有记录
  const sortedRecords = useMemo(() => {
    if (!records || records.length === 0) return [];
    return [...records].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [records]);

  if (sortedRecords.length === 0) {
    return null;
  }

  // 计算时间范围（最早和最晚的记录）
  const earliestTime = new Date(sortedRecords[0].timestamp);
  const latestTime = new Date(sortedRecords[sortedRecords.length - 1].timestamp);
  
  // 计算总时间跨度（毫秒）
  const totalTimeSpan = latestTime - earliestTime;
  
  // 如果所有记录在同一天，使用24小时时间轴
  const isSameDay = earliestTime.toDateString() === latestTime.toDateString();
  
  // 计算每个记录在时间轴上的位置（百分比）
  const getPosition = (timestamp) => {
    const recordTime = new Date(timestamp);
    if (totalTimeSpan === 0) return 0; // 避免除以零
    const timeFromStart = recordTime - earliestTime;
    return (timeFromStart / totalTimeSpan) * 100;
  };

  // 生成日期标记（如果跨天）
  const dateMarkers = useMemo(() => {
    if (isSameDay) return [];
    
    const markers = [];
    const seenDates = new Set();
    
    sortedRecords.forEach(record => {
      const date = new Date(record.timestamp);
      const dateKey = date.toLocaleDateString('zh-CN');
      
      if (!seenDates.has(dateKey)) {
        seenDates.add(dateKey);
        // 计算位置
        const recordTime = new Date(record.timestamp);
        const timeFromStart = recordTime - earliestTime;
        const position = totalTimeSpan === 0 ? 0 : (timeFromStart / totalTimeSpan) * 100;
        
        markers.push({
          date: dateKey,
          position: position,
        });
      }
    });
    
    return markers;
  }, [sortedRecords, isSameDay, earliestTime, latestTime, totalTimeSpan]);

  // 生成小时标记（如果同一天，显示24小时；如果跨天，显示日期）
  const generateMarkers = () => {
    if (isSameDay) {
      // 同一天：显示24小时标记
      return Array.from({ length: 24 }, (_, i) => ({
        type: 'hour',
        value: i,
        position: (i / 24) * 100,
      }));
    } else {
      // 跨天：显示日期标记
      return dateMarkers.map(marker => ({
        type: 'date',
        value: marker.date,
        position: marker.position,
      }));
    }
  };

  const markers = generateMarkers();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>所有历史记录时间轴</Text>
        <Text style={styles.recordCount}>{sortedRecords.length} 条记录</Text>
      </View>

      <View style={styles.timelineContainer}>
        {/* 时间轴背景 */}
        <View style={styles.timelineBackground}>
          {/* 标记线 */}
          {markers.map((marker, index) => (
            <View
              key={`marker-${index}`}
              style={[
                styles.marker,
                { left: `${marker.position}%` },
              ]}
            />
          ))}

          {/* 活动时间点 */}
          {sortedRecords.map((record) => {
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
                    position > 90 && styles.timeLabelRight,
                    position < 10 && styles.timeLabelLeft,
                  ]}
                >
                  <Text style={styles.timeText}>
                    {isSameDay ? formatTime(record.timestamp) : formatDateTime(record.timestamp)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* 标记标签 */}
        <View style={styles.markerLabels}>
          {markers.map((marker, index) => (
            <View
              key={`label-${index}`}
              style={[
                styles.markerLabel,
                { left: `${marker.position}%` },
                marker.position > 90 && styles.markerLabelRight,
                marker.position < 10 && styles.markerLabelLeft,
              ]}
            >
              <Text style={styles.markerLabelText}>
                {marker.type === 'hour' ? `${String(marker.value).padStart(2, '0')}:00` : marker.value.split('/')[1]}
              </Text>
            </View>
          ))}
        </View>

        {/* 活动时间段 */}
        {sortedRecords.map((record, index) => {
          if (index === sortedRecords.length - 1) return null;
          
          const currentPosition = getPosition(record.timestamp);
          const nextRecord = sortedRecords[index + 1];
          const nextPosition = getPosition(nextRecord.timestamp);
          const color = getTypeColor(record.type);
          
          // 如果下一条记录是相同类型，显示连接线
          if (record.type === nextRecord.type) {
            return (
              <View
                key={`segment-${record.id}`}
                style={[
                  styles.timeSegment,
                  {
                    left: `${currentPosition}%`,
                    width: `${nextPosition - currentPosition}%`,
                    backgroundColor: color + '60',
                  },
                ]}
              />
            );
          }
          return null;
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  recordCount: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  timelineContainer: {
    position: 'relative',
    height: 100,
    marginBottom: 50,
  },
  timelineBackground: {
    position: 'relative',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  marker: {
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
    top: 15,
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
    top: 42,
    transform: [{ translateX: -30 }],
    minWidth: 60,
  },
  timeLabelRight: {
    transform: [{ translateX: -60 }],
  },
  timeLabelLeft: {
    transform: [{ translateX: 0 }],
  },
  timeText: {
    fontSize: 9,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  markerLabels: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    height: 20,
  },
  markerLabel: {
    position: 'absolute',
    transform: [{ translateX: -15 }],
    minWidth: 30,
  },
  markerLabelRight: {
    transform: [{ translateX: -30 }],
  },
  markerLabelLeft: {
    transform: [{ translateX: 0 }],
  },
  markerLabelText: {
    fontSize: 10,
    color: '#95A5A6',
    fontWeight: '500',
  },
  timeSegment: {
    position: 'absolute',
    top: 27,
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
