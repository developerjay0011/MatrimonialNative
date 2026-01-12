import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';

interface ForgotPasswordScreenProps {
    navigation: any;
    onBack?: () => void;
}

export function ForgotPasswordScreen({ navigation, onBack }: ForgotPasswordScreenProps) {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (email) {
            setLoading(true);
            // TODO: Implement actual reset password logic here
            setTimeout(() => {
                setLoading(false);
                navigation.goBack();
            }, 1000);
        }
    };

    return (
        <CustomSafeAreaView
            barColor="#f97316"
            barStyle="light-content"
            style={styles.safeArea}
            edges={['right', 'left']}
            headerComponent={(insets) => (
                <Animated.View
                    entering={FadeInUp.duration(600)}
                    style={styles.headerWrapper}
                >
                    <LinearGradient
                        colors={['#f97316', '#ea580c']}
                        style={[styles.headerGradient, { paddingTop: insets.top + 30 }]}
                    >
                        <Animated.View
                            entering={FadeInUp.delay(200).springify()}
                            style={styles.logoContainer}
                        >
                            <Text style={styles.logoText}>🔒</Text>
                        </Animated.View>
                        <Text style={styles.headerTitle}>{t('forgotPassword.title', 'Forgot Password')}</Text>
                        <Text style={styles.headerSubtitle}>{t('forgotPassword.subtitle', 'Enter your email to reset your password')}</Text>
                    </LinearGradient>
                </Animated.View>
            )}
        >
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.card}>
                    <Animated.View entering={FadeInRight}>
                        <View style={styles.sectionSpacing}>
                            <Text style={styles.inputLabel}>
                                {t('login.email')}
                            </Text>
                            <TextInput
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                placeholder={t('login.emailPlaceholder')}
                                style={styles.textInput}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleResetPassword}
                            disabled={!email || loading}
                            style={[styles.primaryButton, (!email || loading) && styles.primaryButtonDisabled]}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text style={styles.primaryButtonText}>{t('forgotPassword.sendResetLink', 'Send Reset Link')}</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => onBack ? onBack() : navigation.goBack()}
                            style={styles.backButton}
                        >
                            <Text style={styles.backButtonText}>{t('common.back', 'Back to Login')}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
}
