import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getTypeIcon = (type) => {
  switch (type) {
    case 'feeding':
      return 'baby-bottle';
    case 'sleeping':
      return 'sleep';
    case 'diaper':
      return 'baby-face-outline';
    default:
      return 'circle';
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

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const formatFullDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function TimelineView({ records, selectedDate }) {
  // 筛选选中日期的记录
  const dayRecords = useMemo(() => {
    if (!selectedDate) return [];
    
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();
    
    return records
      .filter(record => {
        const recordDate = new Date(record.timestamp);
        return (
          recordDate.getFullYear() === selectedYear &&
          recordDate.getMonth() === selectedMonth &&
          recordDate.getDate() === selectedDay
        );
      })
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [records, selectedDate]);

  if (!selectedDate) {
    return (
      <Card style={styles.timelineCard}>
        <Card.Content>
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="calendar-clock" size={48} color="#BDC3C7" />
            <Text style={styles.emptyText}>请选择日期查看时间轴</Text>
          </View>
        </Card.Content>
      </Card>
    );
  }

  if (dayRecords.length === 0) {
    return (
      <Card style={styles.timelineCard}>
        <Card.Content>
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="calendar-blank" size={48} color="#BDC3C7" />
            <Text style={styles.emptyText}>这一天没有记录</Text>
          </View>
        </Card.Content>
      </Card>
    );
  }

  // 计算时间轴的总时长（从第一条记录到最后一条记录）
  const firstRecord = dayRecords[0];
  const lastRecord = dayRecords[dayRecords.length - 1];
  const startTime = new Date(firstRecord.timestamp);
  const endTime = new Date(lastRecord.timestamp);
  const totalMinutes = Math.max((endTime - startTime) / (1000 * 60), 1); // 至少1分钟，避免除零

  // 计算每个时间点在时间轴上的位置
  const getTimelinePosition = (timestamp) => {
    if (dayRecords.length === 1) return 0; // 只有一条记录时，放在起点
    const recordTime = new Date(timestamp);
    const minutesFromStart = (recordTime - startTime) / (1000 * 60);
    return (minutesFromStart / totalMinutes) * 100;
  };

  return (
    <Card style={styles.timelineCard}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>
            {selectedDate.toLocaleDateString('zh-CN', {
              month: 'long',
              day: 'numeric',
            })} 时间轴
          </Text>
          <Text style={styles.subtitle}>{dayRecords.length} 条记录</Text>
        </View>

        <View style={styles.timelineContainer}>
          {/* 时间轴主线 */}
          <View style={styles.timelineLine}>
            {dayRecords.map((record, index) => {
              const color = getTypeColor(record.type);
              const position = getTimelinePosition(record.timestamp);
              
              return (
                <View key={record.id} style={styles.timelineItem}>
                  {/* 时间点标记 */}
                  <View
                    style={[
                      styles.timelineDot,
                      { backgroundColor: color },
                      { left: `${position}%` },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={getTypeIcon(record.type)}
                      size={16}
                      color="#FFFFFF"
                    />
                  </View>
                  
                  {/* 连接线（除了最后一个） */}
                  {index < dayRecords.length - 1 && (
                    <View
                      style={[
                        styles.timelineConnector,
                        {
                          left: `${position}%`,
                          width: `${getTimelinePosition(dayRecords[index + 1].timestamp) - position}%`,
                          backgroundColor: color + '40',
                        },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>

          {/* 记录详情 */}
          <View style={styles.recordsList}>
            {dayRecords.map((record) => {
              const color = getTypeColor(record.type);
              return (
                <View key={record.id} style={styles.recordItem}>
                  <View style={[styles.recordIcon, { backgroundColor: color + '20' }]}>
                    <MaterialCommunityIcons
                      name={getTypeIcon(record.type)}
                      size={20}
                      color={color}
                    />
                  </View>
                  <View style={styles.recordInfo}>
                    <View style={styles.recordTypeContainer}>
                      <Text style={styles.recordType}>{getTypeLabel(record.type)}</Text>
                      {record.type === 'feeding' && record.amount && (
                        <Text style={styles.amountText}>{record.amount} oz</Text>
                      )}
                      {record.type === 'diaper' && record.diaperType && (
                        <Text style={styles.diaperTypeText}>
                          {record.diaperType === 'pee' ? '尿尿' :
                           record.diaperType === 'poop' ? '拉臭臭' :
                           record.diaperType === 'both' ? '尿尿&拉臭臭' : ''}
                        </Text>
                      )}
                    </View>
                    <Text style={styles.recordTime}>{formatFullDateTime(record.timestamp)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  timelineCard: {
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#BDC3C7',
    marginTop: 16,
  },
  timelineContainer: {
    position: 'relative',
    minHeight: 200,
  },
  timelineLine: {
    position: 'relative',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 40,
  },
  timelineItem: {
    position: 'absolute',
    top: -10,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -12 }],
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  timelineConnector: {
    position: 'absolute',
    top: 10,
    height: 4,
    borderRadius: 2,
  },
  recordsList: {
    marginTop: 20,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
  },
  recordIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recordType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginRight: 8,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B9D',
    backgroundColor: '#FF6B9D20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  diaperTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFE66D',
    backgroundColor: '#FFE66D30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  recordTime: {
    fontSize: 14,
    color: '#7F8C8D',
  },
});
