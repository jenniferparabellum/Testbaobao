import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainScreen from './src/screens/MainScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import CalendarScreen from './src/screens/CalendarScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B9D',
    accent: '#C44569',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#2C3E50',
  },
};

const STORAGE_KEY = '@baby_records';

export default function App() {
  const [records, setRecords] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('main');

  useEffect(() => {
    loadRecords();
    
    // 仅在Web平台启用浏览器历史记录支持
    if (Platform.OS === 'web') {
      // 初始化：根据当前URL设置屏幕，或设置初始URL
      const path = window.location.pathname;
      if (path === '/history' || path === '/history/') {
        setCurrentScreen('history');
      } else if (path === '/calendar' || path === '/calendar/') {
        setCurrentScreen('calendar');
      } else {
        // 确保主页面URL正确
        if (path !== '/' && path !== '') {
          window.history.replaceState({ screen: 'main' }, '', '/');
        }
      }

      // 监听浏览器后退/前进按钮
      const handlePopState = (event) => {
        if (event.state) {
          setCurrentScreen(event.state.screen || 'main');
        } else {
          // 如果没有state，根据URL判断
          const path = window.location.pathname;
          if (path === '/history' || path === '/history/') {
            setCurrentScreen('history');
          } else if (path === '/calendar' || path === '/calendar/') {
            setCurrentScreen('calendar');
          } else {
            setCurrentScreen('main');
          }
        }
      };

      window.addEventListener('popstate', handlePopState);

      // 清理函数
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);

  const loadRecords = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setRecords(JSON.parse(data));
      }
    } catch (error) {
      console.error('加载记录失败:', error);
    }
  };

  const saveRecord = async (type, data = {}) => {
    try {
      const newRecord = {
        id: Date.now().toString(),
        type,
        // 如果data中有timestamp，使用自定义时间，否则使用当前时间
        timestamp: data.timestamp || new Date().toISOString(),
        ...data,
      };

      const updatedRecords = [newRecord, ...records];
      setRecords(updatedRecords);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
      
      Alert.alert('成功', '记录已保存！', [{ text: '确定' }]);
    } catch (error) {
      console.error('保存记录失败:', error);
      Alert.alert('错误', '保存失败，请重试');
    }
  };

  const deleteRecord = async (id) => {
    try {
      const updatedRecords = records.filter(record => record.id !== id);
      setRecords(updatedRecords);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    } catch (error) {
      console.error('删除记录失败:', error);
      Alert.alert('错误', '删除失败，请重试');
    }
  };

  // 导航函数，支持浏览器历史记录
  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    
    // 在Web平台上更新浏览器历史记录
    if (Platform.OS === 'web') {
      const path = screen === 'main' ? '/' : `/${screen}`;
      window.history.pushState({ screen }, '', path);
    }
  };

  const navigateToHistory = () => navigateToScreen('history');
  const navigateToCalendar = () => navigateToScreen('calendar');
  const navigateToMain = () => navigateToScreen('main');

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container} edges={Platform.OS === 'web' ? [] : ['top']}>
        <StatusBar style="dark" />
        {currentScreen === 'main' ? (
          <MainScreen
            onSaveRecord={saveRecord}
            onNavigateToHistory={navigateToHistory}
            onNavigateToCalendar={navigateToCalendar}
          />
        ) : currentScreen === 'history' ? (
          <HistoryScreen
            records={records}
            onDeleteRecord={deleteRecord}
            onNavigateBack={navigateToMain}
          />
        ) : (
          <CalendarScreen
            records={records}
            onNavigateBack={navigateToMain}
          />
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
