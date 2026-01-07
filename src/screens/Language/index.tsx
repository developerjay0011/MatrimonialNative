import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';

interface LanguageScreenProps {
    onBack: () => void;
}

export function LanguageScreen({ onBack }: LanguageScreenProps) {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    ];

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
                    <Text style={styles.headerTitle}>{t('language.title')}</Text>
                    <View style={{ width: 24 }} />
                </LinearGradient>
            )}
        >
            <ScrollView style={styles.content}>
                <Text style={styles.subtitle}>{t('language.subtitle')}</Text>

                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.languageOption,
                            currentLanguage === lang.code && styles.languageOptionSelected,
                        ]}
                        onPress={() => i18n.changeLanguage(lang.code)}
                    >
                        <View style={styles.languageInfo}>
                            <Text style={styles.languageName}>{t(`language.${lang.code === 'en' ? 'english' : 'gujarati'}`)}</Text>
                            <Text style={styles.languageNative}>{lang.nativeName}</Text>
                        </View>
                        {currentLanguage === lang.code && (
                            <View style={styles.checkIcon}>
                                <Check size={20} color="#ffffff" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Note */}
                <View style={styles.noteContainer}>
                    <Text style={styles.noteTitle}>{t('language.note')}</Text>
                    <Text style={styles.noteText}>
                        {t('language.noteText')}
                    </Text>
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
}


