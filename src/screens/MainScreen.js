import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Platform,
} from 'react-native';
import { Card, Button, Title, Paragraph, Dialog, Portal, TextInput, Menu, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MainScreen({ onSaveRecord, onNavigateToHistory, onNavigateToCalendar }) {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [currentType, setCurrentType] = useState(null);
    const [customDateTime, setCustomDateTime] = useState('');
    const [feedingAmount, setFeedingAmount] = useState(null);
    const [amountMenuVisible, setAmountMenuVisible] = useState(false);
    const [diaperType, setDiaperType] = useState(null);
    const [diaperMenuVisible, setDiaperMenuVisible] = useState(false);

    const handleRecordClick = (type) => {
        setCurrentType(type);
        setDialogVisible(true);
        // 如果是feeding类型，重置奶量选择
        if (type === 'feeding') {
            setFeedingAmount(null);
        }
        // 如果是diaper类型，重置尿布类型选择
        if (type === 'diaper') {
            setDiaperType(null);
        }
        // 为Web平台设置默认值
        if (Platform.OS === 'web') {
            setCustomDateTime(getDefaultDateTime());
        } else {
            setCustomDateTime('');
        }
    };

    const handleQuickRecord = () => {
        // 如果是feeding类型，必须选择奶量
        if (currentType === 'feeding' && !feedingAmount) {
            return;
        }
        // 如果是diaper类型，必须选择类型
        if (currentType === 'diaper' && !diaperType) {
            return;
        }

        const recordData = {};
        // 如果是feeding类型，添加奶量信息
        if (currentType === 'feeding') {
            recordData.amount = feedingAmount;
        }
        // 如果是diaper类型，添加尿布类型信息
        if (currentType === 'diaper') {
            recordData.diaperType = diaperType;
        }
        onSaveRecord(currentType, recordData);
        setDialogVisible(false);
        setCurrentType(null);
        setFeedingAmount(null);
        setDiaperType(null);
    };

    const handleCustomRecord = () => {
        if (!customDateTime) {
            return;
        }
        // 如果是feeding类型，必须选择奶量
        if (currentType === 'feeding' && !feedingAmount) {
            return;
        }
        // 如果是diaper类型，必须选择类型
        if (currentType === 'diaper' && !diaperType) {
            return;
        }

        // 将日期时间字符串转换为ISO格式
        const timestamp = new Date(customDateTime).toISOString();
        const recordData = { timestamp };
        // 如果是feeding类型，添加奶量信息
        if (currentType === 'feeding') {
            recordData.amount = feedingAmount;
        }
        // 如果是diaper类型，添加尿布类型信息
        if (currentType === 'diaper') {
            recordData.diaperType = diaperType;
        }
        onSaveRecord(currentType, recordData);
        setDialogVisible(false);
        setCurrentType(null);
        setCustomDateTime('');
        setFeedingAmount(null);
        setDiaperType(null);
    };

    const handleCancel = () => {
        setDialogVisible(false);
        setCurrentType(null);
        setCustomDateTime('');
        setFeedingAmount(null);
        setDiaperType(null);
    };

    // 获取当前日期时间的默认值（用于Web的datetime-local输入）
    const getDefaultDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
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
                        onPress={() => handleRecordClick('feeding')}
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
                        onPress={() => handleRecordClick('sleeping')}
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
                        onPress={() => handleRecordClick('diaper')}
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
                <Button
                    mode="outlined"
                    onPress={onNavigateToCalendar}
                    style={[styles.historyButton, styles.calendarButton]}
                    labelStyle={styles.historyButtonLabel}
                    icon="calendar-month"
                >
                    日历视图
                </Button>
            </View>

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={handleCancel} style={styles.dialog}>
                    <Dialog.Title>选择记录方式</Dialog.Title>
                    <Dialog.Content>
                        <View style={styles.dialogContent}>
                            {/* 如果是feeding类型，先显示奶量选择 */}
                            {currentType === 'feeding' && (
                                <View style={styles.amountContainer}>
                                    <Paragraph style={styles.amountLabel}>请先选择奶量：</Paragraph>
                                    <Menu
                                        visible={amountMenuVisible}
                                        onDismiss={() => setAmountMenuVisible(false)}
                                        anchor={
                                            <Button
                                                mode="outlined"
                                                onPress={() => setAmountMenuVisible(true)}
                                                style={styles.amountButton}
                                                labelStyle={styles.amountButtonLabel}
                                                icon="cup"
                                            >
                                                {feedingAmount ? `${feedingAmount} oz` : '选择奶量'}
                                            </Button>
                                        }
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((oz) => (
                                            <Menu.Item
                                                key={oz}
                                                onPress={() => {
                                                    setFeedingAmount(oz);
                                                    setAmountMenuVisible(false);
                                                }}
                                                title={`${oz} oz`}
                                            />
                                        ))}
                                    </Menu>
                                </View>
                            )}

                            {/* 如果是diaper类型，先显示类型选择 */}
                            {currentType === 'diaper' && (
                                <View style={styles.amountContainer}>
                                    <Paragraph style={styles.amountLabel}>请先选择类型：</Paragraph>
                                    <Menu
                                        visible={diaperMenuVisible}
                                        onDismiss={() => setDiaperMenuVisible(false)}
                                        anchor={
                                            <Button
                                                mode="outlined"
                                                onPress={() => setDiaperMenuVisible(true)}
                                                style={styles.diaperTypeButton}
                                                labelStyle={styles.diaperTypeButtonLabel}
                                                icon="baby-face-outline"
                                            >
                                                {diaperType === 'pee' ? '尿尿' :
                                                    diaperType === 'poop' ? '拉臭臭' :
                                                        diaperType === 'both' ? '尿尿&拉臭臭' :
                                                            '选择类型'}
                                            </Button>
                                        }
                                    >
                                        <Menu.Item
                                            onPress={() => {
                                                setDiaperType('pee');
                                                setDiaperMenuVisible(false);
                                            }}
                                            title="尿尿"
                                        />
                                        <Menu.Item
                                            onPress={() => {
                                                setDiaperType('poop');
                                                setDiaperMenuVisible(false);
                                            }}
                                            title="拉臭臭"
                                        />
                                        <Menu.Item
                                            onPress={() => {
                                                setDiaperType('both');
                                                setDiaperMenuVisible(false);
                                            }}
                                            title="尿尿&拉臭臭"
                                        />
                                    </Menu>
                                </View>
                            )}

                            {/* 对于feeding类型，只有在选择奶量后才显示记录选项 */}
                            {currentType === 'feeding' && feedingAmount && (
                                <View style={styles.recordOptionsContainer}>
                                    <Button
                                        mode="contained"
                                        onPress={handleQuickRecord}
                                        style={styles.quickRecordButton}
                                        labelStyle={styles.dialogButtonLabel}
                                        icon="clock-outline"
                                    >
                                        立即记录（当前时间）
                                    </Button>

                                    <View style={styles.customRecordContainer}>
                                        <Paragraph style={styles.customRecordLabel}>或手动输入时间：</Paragraph>
                                        {Platform.OS === 'web' ? (
                                            <View>
                                                <input
                                                    type="datetime-local"
                                                    value={customDateTime || getDefaultDateTime()}
                                                    onChange={(e) => setCustomDateTime(e.target.value)}
                                                    style={styles.webDateTimeInput}
                                                />
                                            </View>
                                        ) : (
                                            <TextInput
                                                label="日期时间 (YYYY-MM-DD HH:MM)"
                                                value={customDateTime}
                                                onChangeText={setCustomDateTime}
                                                placeholder="例如: 2024-01-15 14:30"
                                                mode="outlined"
                                                style={styles.dateTimeInput}
                                            />
                                        )}
                                        <Button
                                            mode="contained"
                                            onPress={handleCustomRecord}
                                            disabled={!customDateTime}
                                            style={[styles.customRecordButton, !customDateTime && styles.disabledButton]}
                                            labelStyle={styles.dialogButtonLabel}
                                            icon="calendar-clock"
                                        >
                                            使用自定义时间记录
                                        </Button>
                                    </View>
                                </View>
                            )}

                            {/* 对于diaper类型，只有在选择类型后才显示记录选项 */}
                            {currentType === 'diaper' && diaperType && (
                                <View style={styles.recordOptionsContainer}>
                                    <Button
                                        mode="contained"
                                        onPress={handleQuickRecord}
                                        style={styles.quickRecordButton}
                                        labelStyle={styles.dialogButtonLabel}
                                        icon="clock-outline"
                                    >
                                        立即记录（当前时间）
                                    </Button>

                                    <View style={styles.customRecordContainer}>
                                        <Paragraph style={styles.customRecordLabel}>或手动输入时间：</Paragraph>
                                        {Platform.OS === 'web' ? (
                                            <View>
                                                <input
                                                    type="datetime-local"
                                                    value={customDateTime || getDefaultDateTime()}
                                                    onChange={(e) => setCustomDateTime(e.target.value)}
                                                    style={styles.webDateTimeInput}
                                                />
                                            </View>
                                        ) : (
                                            <TextInput
                                                label="日期时间 (YYYY-MM-DD HH:MM)"
                                                value={customDateTime}
                                                onChangeText={setCustomDateTime}
                                                placeholder="例如: 2024-01-15 14:30"
                                                mode="outlined"
                                                style={styles.dateTimeInput}
                                            />
                                        )}
                                        <Button
                                            mode="contained"
                                            onPress={handleCustomRecord}
                                            disabled={!customDateTime}
                                            style={[styles.customRecordButton, !customDateTime && styles.disabledButton]}
                                            labelStyle={styles.dialogButtonLabel}
                                            icon="calendar-clock"
                                        >
                                            使用自定义时间记录
                                        </Button>
                                    </View>
                                </View>
                            )}

                            {/* 对于其他类型（如sleeping），显示原有的记录选项 */}
                            {currentType !== 'feeding' && currentType !== 'diaper' && (
                                <>
                                    <Button
                                        mode="contained"
                                        onPress={handleQuickRecord}
                                        style={styles.quickRecordButton}
                                        labelStyle={styles.dialogButtonLabel}
                                        icon="clock-outline"
                                    >
                                        立即记录（当前时间）
                                    </Button>

                                    <View style={styles.customRecordContainer}>
                                        <Paragraph style={styles.customRecordLabel}>或手动输入时间：</Paragraph>
                                        {Platform.OS === 'web' ? (
                                            <View>
                                                <input
                                                    type="datetime-local"
                                                    value={customDateTime || getDefaultDateTime()}
                                                    onChange={(e) => setCustomDateTime(e.target.value)}
                                                    style={styles.webDateTimeInput}
                                                />
                                            </View>
                                        ) : (
                                            <TextInput
                                                label="日期时间 (YYYY-MM-DD HH:MM)"
                                                value={customDateTime}
                                                onChangeText={setCustomDateTime}
                                                placeholder="例如: 2024-01-15 14:30"
                                                mode="outlined"
                                                style={styles.dateTimeInput}
                                            />
                                        )}
                                        <Button
                                            mode="contained"
                                            onPress={handleCustomRecord}
                                            disabled={!customDateTime}
                                            style={[styles.customRecordButton, !customDateTime && styles.disabledButton]}
                                            labelStyle={styles.dialogButtonLabel}
                                            icon="calendar-clock"
                                        >
                                            使用自定义时间记录
                                        </Button>
                                    </View>
                                </>
                            )}
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleCancel}>取消</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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
    calendarButton: {
        marginTop: 12,
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
    dialog: {
        borderRadius: 16,
    },
    dialogContent: {
        paddingVertical: 8,
    },
    amountContainer: {
        marginBottom: 20,
    },
    amountLabel: {
        marginBottom: 8,
        fontSize: 14,
        color: '#7F8C8D',
        fontWeight: '500',
    },
    recordOptionsContainer: {
        marginTop: 8,
    },
    amountButton: {
        borderColor: '#FF6B9D',
        borderWidth: 2,
        borderRadius: 8,
    },
    amountButtonLabel: {
        fontSize: 16,
        color: '#FF6B9D',
        fontWeight: '600',
    },
    diaperTypeButton: {
        borderColor: '#FFE66D',
        borderWidth: 2,
        borderRadius: 8,
    },
    diaperTypeButtonLabel: {
        fontSize: 16,
        color: '#FFE66D',
        fontWeight: '600',
    },
    quickRecordButton: {
        marginBottom: 24,
        borderRadius: 8,
        backgroundColor: '#FF6B9D',
    },
    customRecordContainer: {
        marginTop: 8,
    },
    customRecordLabel: {
        marginBottom: 12,
        fontSize: 14,
        color: '#7F8C8D',
    },
    webDateTimeInput: {
        width: '100%',
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        fontSize: 16,
        fontFamily: 'inherit',
    },
    dateTimeInput: {
        marginBottom: 16,
    },
    customRecordButton: {
        borderRadius: 8,
        backgroundColor: '#4ECDC4',
    },
    disabledButton: {
        opacity: 0.5,
    },
    dialogButtonLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
