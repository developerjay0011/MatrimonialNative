import React, { useCallback, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator, View } from 'react-native';

interface FormButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    style?: ViewStyle;
    textStyle?: TextStyle;
    loading?: boolean;
}

export function FormButton({
    title,
    onPress,
    disabled = false,
    variant = 'primary',
    style,
    textStyle,
    loading = false
}: FormButtonProps) {
    const debounceTimeout = useRef<number | null>(null);
    const isProcessing = useRef(false);

    const handlePress = useCallback(() => {
        if (isProcessing.current || disabled || loading) {
            return;
        }

        isProcessing.current = true;

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        onPress();

        debounceTimeout.current = setTimeout(() => {
            isProcessing.current = false;
        }, 500);
    }, [onPress, disabled, loading]);

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled || loading}
            style={[
                styles.button,
                variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
                (disabled || loading) && styles.disabledButton,
                style
            ]}
            activeOpacity={0.8}
        >
            <View style={styles.buttonContent}>
                {loading && (
                    <ActivityIndicator
                        size="small"
                        color="#ffffff"
                        style={styles.loader}
                    />
                )}
                <Text style={[
                    styles.buttonText,
                    variant === 'primary' ? styles.primaryText : styles.secondaryText,
                    (disabled || loading) && styles.disabledText,
                    textStyle
                ]}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        marginRight: 8,
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
