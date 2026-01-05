import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MainScreen({ onSaveRecord, onNavigateToHistory }) {
    const handleRecord = (type, data = {}) => {
        onSaveRecord(type, data);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Title style={styles.title}>宝宝记录</Title>
                <Paragraph style={styles.subtitle}>记录宝宝的日常生活</Paragraph>
            </View>

            <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="baby-bottle" size={48} color="#FF6B9D" />
                    </View>
                    <Title style={styles.cardTitle}>吃饭</Title>
                    <Paragraph style={styles.cardDescription}>记录宝宝吃饭时间</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="contained"
                        onPress={() => handleRecord('feeding')}
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                    >
                        记录
                    </Button>
                </Card.Actions>
            </Card>

            <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="sleep" size={48} color="#4ECDC4" />
                    </View>
                    <Title style={styles.cardTitle}>睡觉</Title>
                    <Paragraph style={styles.cardDescription}>记录宝宝睡觉时间</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="contained"
                        onPress={() => handleRecord('sleeping')}
                        style={[styles.button, styles.sleepButton]}
                        labelStyle={styles.buttonLabel}
                    >
                        记录
                    </Button>
                </Card.Actions>
            </Card>

            <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="baby-face-outline" size={48} color="#FFE66D" />
                    </View>
                    <Title style={styles.cardTitle}>换尿布</Title>
                    <Paragraph style={styles.cardDescription}>记录换尿布时间</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="contained"
                        onPress={() => handleRecord('diaper')}
                        style={[styles.button, styles.diaperButton]}
                        labelStyle={styles.buttonLabel}
                    >
                        记录
                    </Button>
                </Card.Actions>
            </Card>

            <View style={styles.historyButtonContainer}>
                <Button
                    mode="outlined"
                    onPress={onNavigateToHistory}
                    style={styles.historyButton}
                    labelStyle={styles.historyButtonLabel}
                    icon="history"
                >
                    查看历史记录
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#7F8C8D',
    },
    card: {
        marginBottom: 16,
        borderRadius: 16,
        elevation: 4,
        backgroundColor: '#FFFFFF',
    },
    cardContent: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    iconContainer: {
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
    },
    button: {
        borderRadius: 24,
        paddingHorizontal: 32,
        backgroundColor: '#FF6B9D',
    },
    sleepButton: {
        backgroundColor: '#4ECDC4',
    },
    diaperButton: {
        backgroundColor: '#FFE66D',
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    historyButtonContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    historyButton: {
        borderColor: '#FF6B9D',
        borderWidth: 2,
        borderRadius: 24,
        paddingHorizontal: 24,
    },
    historyButtonLabel: {
        fontSize: 16,
        color: '#FF6B9D',
        fontWeight: '600',
    },
});
