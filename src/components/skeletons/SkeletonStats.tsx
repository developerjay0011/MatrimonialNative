import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function SkeletonStats() {
    return (
        <SkeletonPlaceholder borderRadius={12}>
            <View style={styles.container}>
                <View style={styles.statCard} />
                <View style={styles.statCard} />
                <View style={styles.statCard} />
            </View>
        </SkeletonPlaceholder>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginVertical: 16,
        gap: 12,
    },
    statCard: {
        flex: 1,
        height: 100,
        borderRadius: 12,
    },
});
