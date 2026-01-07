import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Animated, {
  FadeInUp,
  FadeInLeft,
  FadeInRight
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from "../../components/CustomSafeAreaView";

interface LoginScreenProps {
  onLogin: (userData: any) => void;
  onRegister: () => void;
}

export function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const { t } = useTranslation();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onLogin({ phoneNumber, verified: true });
    }
  };

  const handleEmailLogin = () => {
    if (email && password) {
      onLogin({ email, verified: true });
    }
  };

  return (
    <CustomSafeAreaView
      barColor="#f97316"
      barStyle="light-content"
      style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      edges={['right', 'left']}
      headerComponent={(insets) => (
        <Animated.View
          entering={FadeInUp.duration(600)}
          style={{
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            overflow: 'hidden',
            marginBottom: -40
          }}
        >
          <LinearGradient
            colors={['#f97316', '#ea580c']}
            style={{ paddingTop: insets.top + 30, paddingBottom: 100, paddingHorizontal: 24, alignItems: 'center' }}
          >
            <Animated.View
              entering={FadeInUp.delay(200).springify()}
              style={{
                width: 80,
                height: 80,
                backgroundColor: 'white',
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 8
              }}
            >
              <Text style={{ fontSize: 40 }}>❤️</Text>
            </Animated.View>
            <Text style={{ fontSize: 28, fontWeight: '600', color: 'white', marginBottom: 8 }}>Welcome Back</Text>
            <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)' }}>Login to find your life partner</Text>
          </LinearGradient>
        </Animated.View>
      )}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* White Card Container */}
          <Animated.View
            entering={FadeInUp.delay(300).duration(600)}
            style={{
              marginHorizontal: 16,
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5
            }}
          >
            {/* Login Method Toggle */}
            <View style={{
              flexDirection: 'row',
              backgroundColor: '#f3f4f6',
              borderRadius: 12,
              padding: 4,
              marginBottom: 24
            }}>
              <TouchableOpacity
                onPress={() => setLoginMethod("phone")}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: loginMethod === "phone" ? 'white' : 'transparent',
                  shadowColor: loginMethod === "phone" ? '#000' : 'transparent',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: loginMethod === "phone" ? 2 : 0
                }}
              >
                <Text style={{
                  fontSize: 15,
                  fontWeight: loginMethod === "phone" ? '600' : '400',
                  color: loginMethod === "phone" ? '#f97316' : '#6b7280'
                }}>
                  📱 Phone
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLoginMethod("email")}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: loginMethod === "email" ? 'white' : 'transparent',
                  shadowColor: loginMethod === "email" ? '#000' : 'transparent',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: loginMethod === "email" ? 2 : 0
                }}
              >
                <Text style={{
                  fontSize: 15,
                  fontWeight: loginMethod === "email" ? '600' : '400',
                  color: loginMethod === "email" ? '#f97316' : '#6b7280'
                }}>
                  ✉️ Email
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phone Login */}
            {loginMethod === "phone" && (
              <Animated.View entering={FadeInLeft}>
                <View>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8
                  }}>
                    Mobile Number
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                    <View style={{
                      width: 64,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f9fafb',
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 8,
                      height: 48
                    }}>
                      <Text style={{ fontWeight: '500', color: '#374151' }}>+91</Text>
                    </View>
                    <TextInput
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={phoneNumber}
                      onChangeText={(val) => setPhoneNumber(val.replace(/\D/g, ""))}
                      placeholder="Enter 10 digit mobile"
                      editable={!otpSent}
                      style={{
                        flex: 1,
                        paddingHorizontal: 16,
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        height: 48,
                        fontSize: 15,
                        color: '#111827'
                      }}
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                </View>

                {otpSent && (
                  <Animated.View entering={FadeInUp} style={{ marginBottom: 16 }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      Enter OTP
                    </Text>
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={6}
                      value={otp}
                      onChangeText={(val) => setOtp(val.replace(/\D/g, ""))}
                      placeholder="6-digit OTP"
                      style={{
                        width: '100%',
                        paddingHorizontal: 16,
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        height: 48,
                        textAlign: 'center',
                        fontSize: 18,
                        letterSpacing: 4,
                        marginBottom: 8,
                        color: '#111827'
                      }}
                      placeholderTextColor="#9ca3af"
                    />
                    <Text style={{
                      fontSize: 13,
                      color: '#6b7280',
                      textAlign: 'center'
                    }}>
                      OTP sent to +91 {phoneNumber}
                    </Text>
                  </Animated.View>
                )}

                {!otpSent ? (
                  <TouchableOpacity
                    onPress={handleSendOTP}
                    disabled={phoneNumber.length !== 10}
                    style={{
                      width: '100%',
                      backgroundColor: phoneNumber.length === 10 ? '#f97316' : '#fed7aa',
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Send OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ gap: 12 }}>
                    <TouchableOpacity
                      onPress={handleVerifyOTP}
                      disabled={otp.length !== 6}
                      style={{
                        width: '100%',
                        backgroundColor: otp.length === 6 ? '#f97316' : '#fed7aa',
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: 'center'
                      }}
                    >
                      <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Verify & Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setOtpSent(false)}
                      style={{ alignItems: 'center' }}
                    >
                      <Text style={{ color: '#f97316', fontSize: 14, fontWeight: '500' }}>Change Number</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Animated.View>
            )}

            {/* Email Login */}
            {loginMethod === "email" && (
              <Animated.View entering={FadeInRight}>
                <View style={{ marginBottom: 16 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8
                  }}>
                    Email Address
                  </Text>
                  <TextInput
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      paddingHorizontal: 16,
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 8,
                      height: 48,
                      fontSize: 15,
                      color: '#111827'
                    }}
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={{ marginBottom: 24 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: 8
                  }}>
                    Password
                  </Text>
                  <TextInput
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    style={{
                      width: '100%',
                      paddingHorizontal: 16,
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 8,
                      height: 48,
                      fontSize: 15,
                      color: '#111827'
                    }}
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <TouchableOpacity
                  onPress={handleEmailLogin}
                  disabled={!email || !password}
                  style={{
                    width: '100%',
                    backgroundColor: (email && password) ? '#f97316' : '#fed7aa',
                    paddingVertical: 14,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginBottom: 16
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#f97316', fontSize: 14, fontWeight: '500' }}>Forgot Password?</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </Animated.View>

          {/* Register Link */}
          <Animated.View
            entering={FadeInUp.delay(500)}
            style={{
              alignItems: 'center',
              marginTop: 32,
              marginBottom: 32
            }}
          >
            <Text style={{ color: '#6b7280', fontSize: 15, marginBottom: 8 }}>Don't have an account?</Text>
            <TouchableOpacity onPress={onRegister}>
              <Text style={{ color: '#f97316', fontWeight: '600', fontSize: 16 }}>Create New Account</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}
