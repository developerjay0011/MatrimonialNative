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
    ChevronRight,
    Users,
    Images
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DeactivateDialog, LogoutDialog } from '../../components/ConfirmationDialogs';
import { deactivateUser, logoutUser } from '../../redux/actions';

interface SettingsScreenProps {
    onBack: () => void;
    onEditProfile: () => void;
    onProfileVisibility: () => void;
    onPrivacySettings: () => void;
    onNotifications: () => void;
    onLanguage: () => void;
    onHelpSupport: () => void;
    onSafetyTips: () => void;
    onFamilyInfo: () => void;
    onManageGallery: () => void;
}

export function SettingsScreen({
    onEditProfile,
    onProfileVisibility,
    onPrivacySettings,
    onNotifications,
    onLanguage,
    onHelpSupport,
    onSafetyTips,
    onFamilyInfo,
    onManageGallery,
}: SettingsScreenProps) {
    const { t } = useTranslation();
    const [logoutDialogVisible, setLogoutDialogVisible] = React.useState(false);
    const [deactivateDialogVisible, setDeactivateDialogVisible] = React.useState(false);

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
                <LinearGradient
                    colors={['#f97316', '#ea580c']}
                    style={[styles.header, { paddingTop: insets.top + 15 }]}
                >
                    <Text style={styles.title}>{t('settings.title')}</Text>
                </LinearGradient>
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
                            icon={Users}
                            title="Family Information"
                            onPress={onFamilyInfo}
                        />
                        <MenuItem
                            icon={Images}
                            title="Manage Gallery"
                            onPress={onManageGallery}
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
                            color="#ef4444"
                            title={t('settings.deactivateAccount')}
                            onPress={() => setDeactivateDialogVisible(true)}
                        />
                        <MenuItem
                            icon={LogOut}
                            title={t('settings.logout')}
                            onPress={() => setLogoutDialogVisible(true)}
                        />
                    </View>
                </View>

                {/* App Info */}
                <View style={styles.appInfo}>
                    <Text style={styles.appInfoText}>Dhimmar Samaj Matrimony</Text>
                    <Text style={styles.appVersion}>Version 1.0.0</Text>
                </View>

                <LogoutDialog
                    isOpen={logoutDialogVisible}
                    onConfirm={() => { logoutUser() }}
                    onClose={() => setLogoutDialogVisible(false)}
                />
                <DeactivateDialog
                    isOpen={deactivateDialogVisible}
                    onConfirm={() => { deactivateUser() }}
                    onClose={() => setDeactivateDialogVisible(false)}
                />
            </ScrollView>
        </CustomSafeAreaView>
    );
}


