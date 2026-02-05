import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DAYS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

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

export default function CalendarView({ records, selectedDate, onDateSelect }) {
  const currentDate = selectedDate || new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 获取该月第一天是星期几
  const firstDay = new Date(year, month, 1).getDay();
  // 获取该月有多少天
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 按日期分组记录
  const recordsByDate = useMemo(() => {
    const grouped = {};
    records.forEach(record => {
      const date = new Date(record.timestamp);
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(record);
    });
    return grouped;
  }, [records]);

  // 获取某一天的记录类型
  const getDayRecords = (day) => {
    const dateKey = `${year}-${month}-${day}`;
    return recordsByDate[dateKey] || [];
  };

  // 获取某一天的主要活动类型（用于显示颜色点）
  const getDayMainType = (day) => {
    const dayRecords = getDayRecords(day);
    if (dayRecords.length === 0) return null;
    
    // 统计各类型数量
    const typeCount = {};
    dayRecords.forEach(record => {
      typeCount[record.type] = (typeCount[record.type] || 0) + 1;
    });
    
    // 返回数量最多的类型
    return Object.keys(typeCount).reduce((a, b) => 
      typeCount[a] > typeCount[b] ? a : b
    );
  };

  // 判断某一天是否被选中
  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  // 判断是否是今天
  const isToday = (day) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  // 生成日历网格
  const calendarDays = [];
  
  // 填充上个月的空白
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // 填充本月的日期
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handleDatePress = (day) => {
    if (day) {
      const date = new Date(year, month, day);
      onDateSelect(date);
    }
  };

  return (
    <Card style={styles.calendarCard}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.monthYear}>
            {MONTHS[month]} {year}
          </Text>
        </View>
        
        {/* 星期标题 */}
        <View style={styles.weekDays}>
          {DAYS.map((day, index) => (
            <View key={index} style={styles.weekDay}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* 日期网格 */}
        <View style={styles.calendarGrid}>
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <View key={index} style={styles.dayCell} />;
            }

            const dayRecords = getDayRecords(day);
            const mainType = getDayMainType(day);
            const selected = isSelected(day);
            const today = isToday(day);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  selected && styles.selectedDay,
                  today && !selected && styles.todayDay,
                ]}
                onPress={() => handleDatePress(day)}
              >
                <Text
                  style={[
                    styles.dayText,
                    selected && styles.selectedDayText,
                    today && !selected && styles.todayDayText,
                  ]}
                >
                  {day}
                </Text>
                {mainType && (
                  <View
                    style={[
                      styles.typeDot,
                      { backgroundColor: getTypeColor(mainType) },
                    ]}
                  />
                )}
                {dayRecords.length > 1 && (
                  <Text style={styles.recordCount}>{dayRecords.length}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  calendarCard: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 4,
  },
  selectedDay: {
    backgroundColor: '#FF6B9D',
    borderRadius: 8,
  },
  todayDay: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  todayDayText: {
    color: '#FF6B9D',
    fontWeight: '600',
  },
  typeDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  recordCount: {
    position: 'absolute',
    top: 2,
    right: 2,
    fontSize: 8,
    color: '#7F8C8D',
    fontWeight: '600',
  },
});
