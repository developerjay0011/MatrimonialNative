import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { ArrowLeft, Mail, Phone, MessageCircle } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
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

                <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('mailto:support@dhimmarsamaj.com')}>
                    <Mail size={20} color="#f97316" />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>{t('helpSupport.email')}</Text>
                        <Text style={styles.contactValue}>support@dhimmarsamaj.com</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('tel:+911234567890')}>
                    <Phone size={20} color="#f97316" />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>{t('helpSupport.phone')}</Text>
                        <Text style={styles.contactValue}>+91 123 456 7890</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem}>
                    <MessageCircle size={20} color="#f97316" />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>{t('helpSupport.liveChat')}</Text>
                        <Text style={styles.contactValue}>{t('helpSupport.liveChatDesc')}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </CustomSafeAreaView>
    );
}


