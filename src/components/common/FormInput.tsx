import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface FormInputProps extends TextInputProps {
    label: string;
    required?: boolean;
    error?: string;
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
    onPress?: () => void;
    type?: 'text' | 'phone' | 'email';
    multiline?: boolean;
}

export function FormInput({ label, onPress, required, error, rightIcon, onRightIconPress, type, multiline, ...props }: FormInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordField = props.secureTextEntry;

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label} {required && <Text style={styles.required}>*</Text>}
            </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={!onPress} style={[styles.inputContainer, type === 'phone' && styles.phoneRow]}>
                {
                    type === 'phone' && (
                        <View style={styles.countryCodeBox}>
                            <Text style={styles.countryCodeText}>+91</Text>
                        </View>
                    )
                }
                <TextInput
                    {...props}
                    style={[
                        styles.input,
                        error && styles.inputError,
                        multiline && styles.inputMultiline,
                        (rightIcon || isPasswordField) ? styles.inputWithIcon : undefined
                    ]}
                    multiline={multiline}
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={isPasswordField && !isPasswordVisible}
                />
                {isPasswordField && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={togglePasswordVisibility}
                        activeOpacity={0.7}
                    >
                        {isPasswordVisible ? (
                            <Eye size={20} color="#6b7280" />
                        ) : (
                            <EyeOff size={20} color="#6b7280" />
                        )}
                    </TouchableOpacity>
                )}
                {!isPasswordField && rightIcon && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onRightIconPress}
                        activeOpacity={0.7}
                    >
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    countryCodeBox: {
        width: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        height: 48,
    },
    phoneRow: {
        flexDirection: 'row',
        flexShrink: 1,
        gap: 8,
    },
    countryCodeText: {
        fontWeight: '600',
        color: '#374151',
    },
    container: {
        marginBottom: 18,
    },
    inputMultiline: {
        height: null,
        minHeight: 120,
        textAlignVertical: 'top',
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 6,
    },
    required: {
        color: '#ef4444',
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
    },
    input: {
        flexShrink: 1, width: '100%',
        paddingHorizontal: 14,
        paddingVertical: 13,
        borderWidth: 1.5,
        borderColor: '#e5e7eb',
        borderRadius: 10,
        fontSize: 15,
        color: '#111827',
        backgroundColor: '#ffffff',
        fontWeight: '600',
    },
    inputWithIcon: {
        paddingRight: 48,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    iconButton: {
        position: 'absolute',
        right: 12,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    errorText: {
        fontSize: 12,
        color: '#ef4444',
        marginTop: 4,
    },
});
