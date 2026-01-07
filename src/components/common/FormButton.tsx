import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface FormButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export function FormButton({
    title,
    onPress,
    disabled = false,
    variant = 'primary',
    style,
    textStyle
}: FormButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
                disabled && styles.disabledButton,
                style
            ]}
            activeOpacity={0.8}
        >
            <Text style={[
                styles.buttonText,
                variant === 'primary' ? styles.primaryText : styles.secondaryText,
                disabled && styles.disabledText,
                textStyle
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: '#f97316',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#d1d5db',
    },
    disabledButton: {
        backgroundColor: '#fed7aa',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: '#ffffff',
    },
    secondaryText: {
        color: '#374151',
    },
    disabledText: {
        color: '#ffffff',
    },
});
