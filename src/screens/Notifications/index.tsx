import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Heart, MessageCircle, Eye, Mail } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';

interface NotificationsScreenProps {
    onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
    const { t } = useTranslation();
    const [matchNotifications, setMatchNotifications] = useState(true);
    const [messageNotifications, setMessageNotifications] = useState(true);
    const [profileVisitNotifications, setProfileVisitNotifications] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);

    return (
        <CustomSafeAreaView
            barColor="#f97316"
            barStyle="light-content"
            style={styles.container}
            edges={['right', 'left']}
            headerComponent={(insets) => (
                <LinearGradient
                    colors={['#f97316', '#ea580c']}
                    style={[styles.header, { paddingTop: insets.top + 30 }]}
                >
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <ArrowLeft size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t('notifications.title')}</Text>
                    <View style={{ width: 24 }} />
                </LinearGradient>
            )}
        >
            <ScrollView style={styles.content}>
                {/* Push Notifications */}
                <Text style={styles.sectionTitle}>{t('notifications.pushNotifications')}</Text>

                <View style={styles.settingItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#dcfce7' }]}>
                        <Heart size={20} color="#22c55e" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingLabel}>{t('notifications.matchNotifications')}</Text>
                        <Text style={styles.settingDescription}>{t('notifications.matchNotificationsDesc')}</Text>
                    </View>
                    <Switch
                        value={matchNotifications}
                        onValueChange={setMatchNotifications}
                        trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
                        thumbColor={matchNotifications ? '#f97316' : '#f3f4f6'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                        <MessageCircle size={20} color="#3b82f6" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingLabel}>{t('notifications.messageNotifications')}</Text>
                        <Text style={styles.settingDescription}>{t('notifications.messageNotificationsDesc')}</Text>
                    </View>
                    <Switch
                        value={messageNotifications}
                        onValueChange={setMessageNotifications}
                        trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
                        thumbColor={messageNotifications ? '#f97316' : '#f3f4f6'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#fef3c7' }]}>
                        <Eye size={20} color="#f59e0b" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingLabel}>{t('notifications.profileVisitNotifications')}</Text>
                        <Text style={styles.settingDescription}>{t('notifications.profileVisitNotificationsDesc')}</Text>
                    </View>
                    <Switch
                        value={profileVisitNotifications}
                        onValueChange={setProfileVisitNotifications}
                        trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
                        thumbColor={profileVisitNotifications ? '#f97316' : '#f3f4f6'}
                    />
                </View>

                {/* Email */}
                <Text style={styles.sectionTitle}>{t('notifications.email')}</Text>

                <View style={styles.settingItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#f3e8ff' }]}>
                        <Mail size={20} color="#9333ea" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingLabel}>{t('notifications.emailNotifications')}</Text>
                        <Text style={styles.settingDescription}>{t('notifications.emailNotificationsDesc')}</Text>
                    </View>
                    <Switch
                        value={emailNotifications}
                        onValueChange={setEmailNotifications}
                        trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
                        thumbColor={emailNotifications ? '#f97316' : '#f3f4f6'}
                    />
                </View>

                {/* Note */}
                <View style={styles.noteContainer}>
                    <Text style={styles.noteTitle}>{t('notifications.note')}</Text>
                    <Text style={styles.noteText}>
                        {t('notifications.noteText')}
                    </Text>
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
}


