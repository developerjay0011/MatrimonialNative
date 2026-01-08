import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface FormSkeletonProps {
    sections?: number;
    fieldsPerSection?: number;
}

export function FormSkeleton({ sections = 3, fieldsPerSection = 4 }: FormSkeletonProps) {
    return (
        <SkeletonPlaceholder borderRadius={8}>
            <View style={styles.container}>
                {Array.from({ length: sections }).map((_, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        {/* Section Title */}
                        <View style={styles.sectionTitle} />

                        {/* Form Fields */}
                        {Array.from({ length: fieldsPerSection }).map((_, fieldIndex) => (
                            <View key={fieldIndex} style={styles.fieldContainer}>
                                {/* Label */}
                                <View style={styles.label} />
                                {/* Input */}
                                <View style={styles.input} />
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </SkeletonPlaceholder>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    section: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        width: 180,
        height: 16,
        marginBottom: 20,
    },
    fieldContainer: {
        marginBottom: 18,
    },
    label: {
        width: 100,
        height: 13,
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 48,
        borderRadius: 8,
    },
});
