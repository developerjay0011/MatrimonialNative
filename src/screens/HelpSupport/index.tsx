import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { ArrowLeft, Mail, Phone, MessageCircle } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '../../utils/constants';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';

interface HelpSupportScreenProps {
    onBack: () => void;
}

export function HelpSupportScreen({ onBack }: HelpSupportScreenProps) {
    const { t } = useTranslation();

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
                    <Text style={styles.title}>{t('helpSupport.title')}</Text>
                    <View style={{ width: 24 }} />
                </View>
            )}
        >
            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>{t('helpSupport.contactUs')}</Text>

                <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(`mailto:${CONTACT_INFO.SUPPORT_EMAIL}`)}>
                    <Mail size={20} color="#f97316" />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>{t('helpSupport.email')}</Text>
                        <Text style={styles.contactValue}>{CONTACT_INFO.SUPPORT_EMAIL}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(CONTACT_INFO.SUPPORT_PHONE_LINK)}>
                    <Phone size={20} color="#f97316" />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>{t('helpSupport.phone')}</Text>
                        <Text style={styles.contactValue}>{CONTACT_INFO.SUPPORT_PHONE_DISPLAY}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </CustomSafeAreaView>
    );
}


