import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Shield, AlertTriangle, Eye, Lock } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';

interface SafetyTipsScreenProps {
    onBack: () => void;
}

export function SafetyTipsScreen({ onBack }: SafetyTipsScreenProps) {
    const { t } = useTranslation();

    const tips = [
        { icon: Shield, titleKey: 'safetyTips.verifyProfiles', descKey: 'safetyTips.verifyProfilesDesc' },
        { icon: AlertTriangle, titleKey: 'safetyTips.reportSuspicious', descKey: 'safetyTips.reportSuspiciousDesc' },
        { icon: Eye, titleKey: 'safetyTips.meetInPublic', descKey: 'safetyTips.meetInPublicDesc' },
        { icon: Lock, titleKey: 'safetyTips.protectInfo', descKey: 'safetyTips.protectInfoDesc' },
    ];

    return (
        <CustomSafeAreaView
            barColor="#ffffff"
            barStyle="dark-content"
            edges={['right', 'left', 'bottom']}
            style={styles.container}
            headerComponent={(insets) => (
                <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <ArrowLeft size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('safetyTips.title')}</Text>
                    <View style={{ width: 24 }} />
                </View>
            )}
        >
            <ScrollView style={styles.content}>
                {tips.map((tip, index) => (
                    <View key={index} style={styles.tipCard}>
                        <View style={styles.iconContainer}>
                            <tip.icon size={24} color="#f97316" />
                        </View>
                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>{t(tip.titleKey)}</Text>
                            <Text style={styles.tipDescription}>{t(tip.descKey)}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </CustomSafeAreaView>
    );
}


