import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';
import {
    User,
    Eye,
    Lock,
    Bell,
    Globe,
    HelpCircle,
    Shield,
    Trash2,
    LogOut,
    ChevronRight
} from 'lucide-react-native';

interface SettingsScreenProps {
    onBack: () => void;
    onEditProfile: () => void;
    onProfileVisibility: () => void;
    onPrivacySettings: () => void;
    onNotifications: () => void;
    onLanguage: () => void;
    onHelpSupport: () => void;
    onSafetyTips: () => void;
    onDeactivate: () => void;
    onLogout: () => void;
}

export function SettingsScreen({
    onEditProfile,
    onProfileVisibility,
    onPrivacySettings,
    onNotifications,
    onLanguage,
    onHelpSupport,
    onSafetyTips,
    onDeactivate,
    onLogout,
}: SettingsScreenProps) {
    const { t } = useTranslation();
    const MenuItem = ({
        icon: Icon,
        title,
        subtitle,
        onPress,
        color = '#111827'
    }: {
        icon: any;
        title: string;
        subtitle?: string;
        onPress: () => void;
        color?: string;
    }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: color === '#ef4444' ? '#fee2e2' : '#f3f4f6' }]}>
                    <Icon size={20} color={color === '#ef4444' ? '#ef4444' : '#6b7280'} />
                </View>
                <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, { color }]}>{title}</Text>
                    {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
    );

    return (
        <CustomSafeAreaView
            barColor="#f97316"
            style={styles.container}
            barStyle="light-content"
            edges={['right', 'bottom', 'left']}
            headerComponent={(insets) => (
                <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
                    <Text style={styles.title}>{t('settings.title')}</Text>
                </View>
            )}
        >
            <ScrollView style={styles.scrollView}>
                {/* Account Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('settings.account').toUpperCase()}</Text>
                    <View style={styles.sectionContent}>
                        <MenuItem
                            icon={User}
                            title={t('settings.editProfile')}
                            onPress={onEditProfile}
                        />
                        <MenuItem
                            icon={Eye}
                            title={t('settings.profileVisibility')}
                            onPress={onProfileVisibility}
                        />
                        <MenuItem
                            icon={Lock}
                            title={t('settings.privacySettings')}
                            onPress={onPrivacySettings}
                        />
                    </View>
                </View>

                {/* Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('settings.preferences').toUpperCase()}</Text>
                    <View style={styles.sectionContent}>
                        <MenuItem
                            icon={Bell}
                            title={t('settings.notifications')}
                            onPress={onNotifications}
                        />
                        <MenuItem
                            icon={Globe}
                            title={t('settings.language')}
                            subtitle="English"
                            onPress={onLanguage}
                        />
                    </View>
                </View>

                {/* Support Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('settings.support').toUpperCase()}</Text>
                    <View style={styles.sectionContent}>
                        <MenuItem
                            icon={HelpCircle}
                            title={t('settings.helpSupport')}
                            onPress={onHelpSupport}
                        />
                        <MenuItem
                            icon={Shield}
                            title={t('settings.safetyTips')}
                            onPress={onSafetyTips}
                        />
                    </View>
                </View>

                {/* Account Actions Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ACCOUNT ACTIONS</Text>
                    <View style={styles.sectionContent}>
                        <MenuItem
                            icon={Trash2}
                            title={t('settings.deactivateAccount')}
                            onPress={onDeactivate}
                            color="#ef4444"
                        />
                        <MenuItem
                            icon={LogOut}
                            title={t('settings.logout')}
                            onPress={onLogout}
                        />
                    </View>
                </View>

                {/* App Info */}
                <View style={styles.appInfo}>
                    <Text style={styles.appInfoText}>Dhimmar Samaj Matrimony</Text>
                    <Text style={styles.appVersion}>Version 1.0.0</Text>
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
}


