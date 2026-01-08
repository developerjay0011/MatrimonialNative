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
}

export function LoginScreen({ onRegister }: LoginScreenProps) {
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
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSubtitle}>Login to find your life partner</Text>
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
                📱 Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLoginMethod("email")}
              style={[styles.methodButton, loginMethod === "email" && styles.methodButtonActive]}
            >
              <Text style={[styles.methodText, loginMethod === "email" && styles.methodTextActive]}>
                ✉️ Email
              </Text>
            </TouchableOpacity>
          </View>

          {/* Phone Login */}
          {loginMethod === "phone" && (
            <Animated.View entering={FadeInLeft}>
              <View>
                <Text style={styles.inputLabel}>
                  Mobile Number
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
                    placeholder="Enter 10 digit mobile"
                    editable={!otpSent}
                    style={[styles.textInput, styles.phoneInput]}
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {otpSent && (
                <Animated.View entering={FadeInUp} style={styles.otpContainer}>
                  <Text style={styles.inputLabel}>
                    Enter OTP
                  </Text>
                  <TextInput
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={(val) => setOtp(val.replace(/\D/g, ""))}
                    placeholder="6-digit OTP"
                    style={styles.otpInput}
                    placeholderTextColor="#9ca3af"
                  />
                  <View style={styles.otpFooter}>
                    <Text style={styles.otpHint}>
                      OTP sent to +91 {phoneNumber}
                    </Text>
                    {canResend ? (
                      <TouchableOpacity onPress={handleSendOTP} disabled={loading}>
                        <Text style={styles.resendText}>Resend OTP</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.timerText}>
                        Resend in {resendTimer}s
                      </Text>
                    )}
                  </View>
                </Animated.View>
              )}

              {!otpSent ? (
                <TouchableOpacity
                  onPress={handleSendOTP}
                  disabled={phoneNumber.length !== 10 || loading}
                  style={[styles.primaryButton, (phoneNumber.length !== 10 || loading) && styles.primaryButtonDisabled]}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.primaryButtonText}>Send OTP</Text>
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
                      <Text style={styles.primaryButtonText}>Verify & Login</Text>
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
                    <Text style={styles.linkText}>Change Number</Text>
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
                  Email Address
                </Text>
                <TextInput
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  style={styles.textInput}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.sectionSpacingLarge}>
                <Text style={styles.inputLabel}>
                  Password
                </Text>
                <TextInput
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  style={styles.textInput}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <TouchableOpacity
                onPress={handleEmailLogin}
                disabled={!email || !password || loading}
                style={[styles.primaryButton, (!email || !password || loading) && styles.primaryButtonDisabled]}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.primaryButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.centerAlign}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        {/* Register Link */}
        <Animated.View
          entering={FadeInUp.delay(500)}
          style={styles.registerContainer}
        >
          <Text style={styles.registerPrompt}>Don't have an account?</Text>
          <TouchableOpacity onPress={onRegister}>
            <Text style={styles.registerLink}>Create New Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}