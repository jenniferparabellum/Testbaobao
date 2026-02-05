import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import CalendarView from '../components/CalendarView';
import TimelineView from '../components/TimelineView';

export default function CalendarScreen({ records, onNavigateBack }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={onNavigateBack} />
        <Appbar.Content title="日历视图" />
        <Appbar.Action icon="calendar-today" onPress={handleToday} />
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* 月份导航 */}
        <View style={styles.monthNavigation}>
          <Button
            mode="text"
            onPress={handlePreviousMonth}
            icon="chevron-left"
            style={styles.navButton}
          >
            上个月
          </Button>
          <Button
            mode="text"
            onPress={handleNextMonth}
            icon="chevron-right"
            iconPosition="right"
            style={styles.navButton}
          >
            下个月
          </Button>
        </View>

        {/* 日历视图 */}
        <CalendarView
          records={records}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        {/* 时间轴视图 */}
        <TimelineView
          records={records}
          selectedDate={selectedDate}
        />
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  navButton: {
    flex: 1,
  },
});
