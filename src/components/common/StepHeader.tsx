import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface StepHeaderProps {
    currentStep: number;
    totalSteps: number;
    onBack: () => void;
}

export function StepHeader({ currentStep, totalSteps, onBack }: StepHeaderProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.stepText}>
                Step {currentStep} of {totalSteps}
            </Text>
            <View style={styles.placeholder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    placeholder: {
        width: 40,
    },
});
