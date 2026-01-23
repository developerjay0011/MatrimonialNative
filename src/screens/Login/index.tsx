import { styles } from "./styles";

import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/hooks";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Animated, {
  FadeInUp,
  FadeInLeft,
  FadeInRight
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { CustomSafeAreaView } from "../../components/CustomSafeAreaView";
import { sendOTP, verifyOTP, loginUser } from "../../redux/actions/auth";

interface LoginScreenProps {
  onRegister: () => void;
  onForgotPassword: () => void;
}

export function LoginScreen({ onRegister, onForgotPassword }: LoginScreenProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  const handleSendOTP = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      setOtpSent(false);
      dispatch(
        sendOTP(`+91${phoneNumber.trim()}`,
          (response: any) => {
            setLoading(false);
            if (response.success) {
              setOtp('');
              setResendTimer(60);
              setCanResend(false)
              setOtpSent(true);
            }
          })
      );
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      setLoading(true);
      dispatch(
        verifyOTP(`+91${phoneNumber.trim()}`, otp.trim(),
          (response: any) => {
            setLoading(false);
            setOtp('');
          })
      );
    }
  };

  const handleEmailLogin = async () => {
    if (email && password) {
      setLoading(true);
      dispatch(loginUser({ email: email.trim(), password: password.trim() }, setLoading));
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
              <Text style={styles.logoText}>❤️</Text>
            </Animated.View>
            <Text style={styles.headerTitle}>{t('login.title')}</Text>
            <Text style={styles.headerSubtitle}>{t('login.subtitle')}</Text>
          </LinearGradient>
        </Animated.View>
      )}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* White Card Container */}
        <View style={styles.card}>

          {/* Login Method Toggle */}
          <View style={styles.methodToggle}>
            <TouchableOpacity
              onPress={() => setLoginMethod("phone")}
              style={[styles.methodButton, loginMethod === "phone" && styles.methodButtonActive]}
            >
              <Text style={[styles.methodText, loginMethod === "phone" && styles.methodTextActive]}>
                📱 {t('login.phoneTab')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLoginMethod("email")}
              style={[styles.methodButton, loginMethod === "email" && styles.methodButtonActive]}
            >
              <Text style={[styles.methodText, loginMethod === "email" && styles.methodTextActive]}>
                ✉️ {t('login.emailTab')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Phone Login */}
          {loginMethod === "phone" && (
            <Animated.View entering={FadeInLeft}>
              <View>
                <Text style={styles.inputLabel}>
                  {t('login.phoneNumber')}
                </Text>
                <View style={styles.phoneRow}>
                  <View style={styles.countryCodeBox}>
                    <Text style={styles.countryCodeText}>+91</Text>
                  </View>
                  <TextInput
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={(val) => setPhoneNumber(val.replace(/\D/g, ""))}
                    placeholder={t('login.phonePlaceholder')}
                    editable={!otpSent}
                    style={[styles.textInput, styles.phoneInput]}
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {otpSent && (
                <Animated.View entering={FadeInUp} style={styles.otpContainer}>
                  <Text style={styles.inputLabel}>
                    {t('login.otpLabel')}
                  </Text>
                  <TextInput
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={(val) => setOtp(val.replace(/\D/g, ""))}
                    placeholder={t('login.otpPlaceholder')}
                    style={styles.otpInput}
                    placeholderTextColor="#9ca3af"
                  />
                  <View style={styles.otpFooter}>
                    <Text style={styles.otpHint}>
                      {t('login.otpSentTo', { phone: phoneNumber })}
                    </Text>
                    {canResend ? (
                      <TouchableOpacity onPress={handleSendOTP} disabled={loading}>
                        <Text style={styles.resendText}>{t('login.resendOtp')}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.timerText}>
                        {t('login.resendIn', { seconds: resendTimer })}
                      </Text>
                    )}
                  </View>
                </Animated.View>
              )}

              {!otpSent ? (
                <TouchableOpacity
                  onPress={handleSendOTP}
                  disabled={phoneNumber.length !== 10 || loading}
                  style={[styles.primaryButton, { marginTop: 10 }, (phoneNumber.length !== 10 || loading) && styles.primaryButtonDisabled]}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.primaryButtonText}>{t('login.sendOtp')}</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.buttonStack}>
                  <TouchableOpacity
                    onPress={handleVerifyOTP}
                    disabled={otp.length !== 6 || loading}
                    style={[styles.primaryButton, (otp.length !== 6 || loading) && styles.primaryButtonDisabled]}
                  >
                    {loading ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : (
                      <Text style={styles.primaryButtonText}>{t('login.verifyLogin')}</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setOtpSent(false);
                      setResendTimer(0);
                      setCanResend(false);
                    }}
                    style={styles.centerAlign}
                  >
                    <Text style={styles.linkText}>{t('login.changeNumber')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>
          )}

          {/* Email Login */}
          {loginMethod === "email" && (
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

              <View style={styles.sectionSpacingLarge}>
                <Text style={styles.inputLabel}>
                  {t('login.password')}
                </Text>
                <TextInput
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t('login.passwordPlaceholder')}
                  style={styles.textInput}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.buttonStack}>
                <TouchableOpacity
                  onPress={handleEmailLogin}
                  disabled={!email || !password || loading}
                  style={[styles.primaryButton, (!email || !password || loading) && styles.primaryButtonDisabled]}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.primaryButtonText}>{t('login.login')}</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.centerAlign} onPress={onForgotPassword}>
                  <Text style={styles.linkText}>{t('login.forgotPassword')}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </View>

        {/* Register Link */}
        <Animated.View
          entering={FadeInUp.delay(600)}
          style={styles.registerContainer}
        >
          <TouchableOpacity
            onPress={onRegister}
            activeOpacity={0.7}
            style={styles.centerAlign}
          >
            <Text style={styles.registerPrompt}>
              {t('login.dontHaveAccount')}{' '}
              <Text style={styles.registerLink}>
                {t('login.signUp')}
              </Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}