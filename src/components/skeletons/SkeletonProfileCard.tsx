import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function SkeletonProfileCard() {
    return (
        <SkeletonPlaceholder borderRadius={16}>
            <View style={styles.card}>
                <View style={styles.image} />
                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        <View style={styles.title} />
                        <View style={styles.badge} />
                    </View>
                    <View style={styles.subtitle} />
                    <View style={styles.detailsGrid}>
                        <View style={styles.detailBox} />
                        <View style={styles.detailBox} />
                        <View style={styles.detailBox} />
                        <View style={styles.detailBox} />
                    </View>
                    <View style={styles.bio} />
                    <View style={styles.button} />
                </View>
            </View>
        </SkeletonPlaceholder>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 400,
    },
    content: {
        padding: 16,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        width: 150,
        height: 24,
    },
    badge: {
        width: 60,
        height: 24,
        borderRadius: 12,
    },
    subtitle: {
        width: 120,
        height: 16,
        marginBottom: 16,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    detailBox: {
        width: '48%',
        height: 60,
        borderRadius: 8,
    },
    bio: {
        width: '100%',
        height: 40,
        marginBottom: 16,
    },
    button: {
        width: '100%',
        height: 48,
        borderRadius: 24,
    },
});
