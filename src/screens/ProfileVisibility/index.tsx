import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Globe, Heart, Lock } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';

interface ProfileVisibilityScreenProps {
    onBack: () => void;
}

export function ProfileVisibilityScreen({ onBack }: ProfileVisibilityScreenProps) {
    const { t } = useTranslation();
    const [visibility, setVisibility] = useState('all');

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
                    <Text style={styles.headerTitle}>{t('profileVisibility.title')}</Text>
                    <View style={{ width: 24 }} />
                </LinearGradient>
            )}
        >
            <ScrollView style={styles.content}>
                <Text style={styles.subtitle}>{t('profileVisibility.subtitle')}</Text>

                {/* Visible to All */}
                <TouchableOpacity
                    style={[styles.option, visibility === 'all' && styles.optionSelected]}
                    onPress={() => setVisibility('all')}
                >
                    <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                        <Globe size={24} color="#3b82f6" />
                    </View>
                    <View style={styles.optionContent}>
                        <Text style={styles.optionTitle}>{t('profileVisibility.visibleToAll')}</Text>
                        <Text style={styles.optionDescription}>{t('profileVisibility.visibleToAllDesc')}</Text>
                    </View>
                    <View style={[styles.radio, visibility === 'all' && styles.radioSelected]}>
                        {visibility === 'all' && <View style={styles.radioDot} />}
                    </View>
                </TouchableOpacity>

                {/* Visible to Matches Only */}
                <TouchableOpacity
                    style={[styles.option, visibility === 'matches' && styles.optionSelected]}
                    onPress={() => setVisibility('matches')}
                >
                    <View style={[styles.iconContainer, { backgroundColor: '#dcfce7' }]}>
                        <Heart size={24} color="#22c55e" />
                    </View>
                    <View style={styles.optionContent}>
                        <Text style={styles.optionTitle}>{t('profileVisibility.visibleToMatches')}</Text>
                        <Text style={styles.optionDescription}>{t('profileVisibility.visibleToMatchesDesc')}</Text>
                    </View>
                    <View style={[styles.radio, visibility === 'matches' && styles.radioSelected]}>
                        {visibility === 'matches' && <View style={styles.radioDot} />}
                    </View>
                </TouchableOpacity>

                {/* Hidden Profile */}
                <TouchableOpacity
                    style={[styles.option, visibility === 'hidden' && styles.optionSelected]}
                    onPress={() => setVisibility('hidden')}
                >
                    <View style={[styles.iconContainer, { backgroundColor: '#fef3c7' }]}>
                        <Lock size={24} color="#f59e0b" />
                    </View>
                    <View style={styles.optionContent}>
                        <Text style={styles.optionTitle}>{t('profileVisibility.hiddenProfile')}</Text>
                        <Text style={styles.optionDescription}>{t('profileVisibility.hiddenProfileDesc')}</Text>
                    </View>
                    <View style={[styles.radio, visibility === 'hidden' && styles.radioSelected]}>
                        {visibility === 'hidden' && <View style={styles.radioDot} />}
                    </View>
                </TouchableOpacity>

                {/* Note */}
                <View style={styles.noteContainer}>
                    <Text style={styles.noteTitle}>{t('profileVisibility.note')}</Text>
                    <Text style={styles.noteText}>{t('profileVisibility.noteText')}</Text>
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
}


