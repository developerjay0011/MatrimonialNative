import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GenderSelectorProps {
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    options?: string[];
}

export function GenderSelector({
    label,
    required,
    value,
    onChange,
    options = ['Male', 'Female']
}: GenderSelectorProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label} {required && <Text style={styles.required}>*</Text>}
            </Text>
            <View style={styles.optionsContainer}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => onChange(option)}
                        style={[
                            styles.option,
                            value === option && styles.optionSelected
                        ]}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            styles.optionText,
                            value === option && styles.optionTextSelected
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 8,
    },
    required: {
        color: '#ef4444',
    },
    optionsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    option: {
        flex: 1,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    optionSelected: {
        borderColor: '#f97316',
        borderWidth: 2,
        backgroundColor: '#fff7ed',
    },
    optionText: {
        fontSize: 15,
        color: '#6b7280',
        fontWeight: '500',
    },
    optionTextSelected: {
        color: '#f97316',
        fontWeight: '600',
    },
});
