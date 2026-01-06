import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Card, Title, Paragraph, Button, Divider, Appbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DayTimeline from '../components/DayTimeline';
import AllRecordsTimeline from '../components/AllRecordsTimeline';

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
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) {
    return '刚刚';
  } else if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
};

const formatFullDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function HistoryScreen({ records, onDeleteRecord, onNavigateBack }) {
  const groupedRecords = useMemo(() => {
    const groups = {};
    records.forEach(record => {
      const date = new Date(record.timestamp).toLocaleDateString('zh-CN');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(record);
    });
    return groups;
  }, [records]);

  const renderRecord = ({ item }) => {
    const color = getTypeColor(item.type);
    return (
      <Card style={styles.recordCard}>
        <Card.Content style={styles.recordContent}>
          <View style={styles.recordLeft}>
            <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
              <MaterialCommunityIcons 
                name={getTypeIcon(item.type)} 
                size={24} 
                color={color} 
              />
            </View>
            <View style={styles.recordInfo}>
              <Title style={styles.recordType}>{getTypeLabel(item.type)}</Title>
              <Paragraph style={styles.recordTime}>{formatFullDate(item.timestamp)}</Paragraph>
            </View>
          </View>
          <Button
            mode="text"
            onPress={() => onDeleteRecord(item.id)}
            textColor="#E74C3C"
            icon="delete-outline"
          >
            删除
          </Button>
        </Card.Content>
      </Card>
    );
  };

  const renderSection = ({ item: date }) => {
    const dayRecords = groupedRecords[date] || [];
    // 将日期字符串转换为Date对象
    // date格式是 "YYYY/M/D" 或类似格式，需要正确解析
    const dateParts = date.split('/');
    let dateObj;
    if (dateParts.length === 3) {
      // 格式: YYYY/M/D
      dateObj = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    } else {
      // 尝试直接解析
      dateObj = new Date(date);
    }
    
    return (
      <View style={styles.section}>
        {/* 24小时时间轴可视化 */}
        <DayTimeline records={records} date={dateObj} />
        
        <View style={styles.sectionHeader}>
          <Title style={styles.sectionTitle}>{date}</Title>
          <Paragraph style={styles.sectionCount}>{dayRecords.length} 条记录</Paragraph>
        </View>
        {dayRecords.map(record => (
          <View key={record.id}>
            {renderRecord({ item: record })}
          </View>
        ))}
      </View>
    );
  };

  if (records.length === 0) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={onNavigateBack} />
          <Appbar.Content title="历史记录" />
        </Appbar.Header>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="baby-face-outline" size={80} color="#BDC3C7" />
          <Title style={styles.emptyTitle}>还没有记录</Title>
          <Paragraph style={styles.emptyText}>开始记录宝宝的日常生活吧！</Paragraph>
        </View>
      </View>
    );
  }

  const dates = Object.keys(groupedRecords).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={onNavigateBack} />
        <Appbar.Content title="历史记录" />
      </Appbar.Header>
      <FlatList
        data={dates}
        renderItem={renderSection}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.allTimelineContainer}>
            <AllRecordsTimeline records={records} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  listContent: {
    padding: 16,
  },
  allTimelineContainer: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  sectionCount: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  recordCard: {
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  recordContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  recordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  recordTime: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#95A5A6',
    marginTop: 24,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#BDC3C7',
    textAlign: 'center',
  },
});
