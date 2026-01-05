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
        timestamp: new Date().toISOString(),
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

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container} edges={Platform.OS === 'web' ? [] : ['top']}>
        <StatusBar style="dark" />
        {currentScreen === 'main' ? (
          <MainScreen
            onSaveRecord={saveRecord}
            onNavigateToHistory={() => setCurrentScreen('history')}
          />
        ) : (
          <HistoryScreen
            records={records}
            onDeleteRecord={deleteRecord}
            onNavigateBack={() => setCurrentScreen('main')}
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
