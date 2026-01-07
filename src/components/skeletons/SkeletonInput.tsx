import React from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface SkeletonInputProps {
    width?: DimensionValue;
    height?: number;
}

export function SkeletonInput({ width = '100%', height = 50 }: SkeletonInputProps) {
    return (
        <SkeletonPlaceholder borderRadius={8}>
            <View style={[styles.input, { width, height }]} />
        </SkeletonPlaceholder>
    );
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
    },
});
