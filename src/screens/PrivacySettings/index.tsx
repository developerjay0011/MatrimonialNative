import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Smartphone, Mail, MessageSquare, Ban, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';

interface PrivacySettingsScreenProps {
    onBack: () => void;
}

export function PrivacySettingsScreen({ onBack }: PrivacySettingsScreenProps) {
    const { t } = useTranslation();
    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [allowMessages, setAllowMessages] = useState(true);

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
                    <Text style={styles.headerTitle}>{t('privacySettings.title')}</Text>
                    <View style={{ width: 24 }} />
                </LinearGradient>
            )}
        >
            <ScrollView style={styles.content}>
                {/* Contact Information */}
                <Text style={styles.sectionTitle}>{t('privacySettings.contactInformation')}</Text>

                <View style={styles.settingItem}>
                    <View style={styles.iconContainer}>
                        <Smartphone size={20} color="#6b7280" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingLabel}>{t('privacySettings.showPhoneNumber')}</Text>
                        <Text style={styles.settingDescription}>{t('privacySettings.showPhoneDesc')}</Text>
                    </View>
                    <Switch
                        value={showPhone}
                        onValueChange={setShowPhone}
                        trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
                        thumbColor={showPhone ? '#f97316' : '#f3f4f6'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.iconContainer}>
                        <Mail size={20} color="#6b7280" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingLabel}>{t('privacySettings.showEmailAddress')}</Text>
                        <Text style={styles.settingDescription}>{t('privacySettings.showEmailDesc')}</Text>
                    </View>
                    <Switch
                        value={showEmail}
                        onValueChange={setShowEmail}
                        trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
                        thumbColor={showEmail ? '#f97316' : '#f3f4f6'}
                    />
                </View>

                {/* Communication */}
                <Text style={styles.sectionTitle}>{t('privacySettings.communication')}</Text>

                <View style={styles.settingItem}>
                    <View style={styles.iconContainer}>
                        <MessageSquare size={20} color="#6b7280" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingLabel}>{t('privacySettings.allowMessageRequests')}</Text>
                        <Text style={styles.settingDescription}>{t('privacySettings.allowMessageDesc')}</Text>
                    </View>
                    <Switch
                        value={allowMessages}
                        onValueChange={setAllowMessages}
                        trackColor={{ false: '#d1d5db', true: '#fed7aa' }}
                        thumbColor={allowMessages ? '#f97316' : '#f3f4f6'}
                    />
                </View>

                {/* Blocked Users */}
                <Text style={styles.sectionTitle}>{t('privacySettings.blockedUsers')}</Text>

                <TouchableOpacity style={styles.settingItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#fee2e2' }]}>
                        <Ban size={20} color="#ef4444" />
                    </View>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingLabel}>{t('privacySettings.blockList')}</Text>
                        <Text style={styles.settingDescription}>3 {t('privacySettings.users')}</Text>
                    </View>
                    <ChevronRight size={20} color="#9ca3af" />
                </TouchableOpacity>

                {/* Privacy Tip */}
                <View style={styles.tipContainer}>
                    <Text style={styles.tipTitle}>{t('privacySettings.privacyTip')}</Text>
                    <Text style={styles.tipText}>
                        {t('privacySettings.privacyTipText')}
                    </Text>
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
}


