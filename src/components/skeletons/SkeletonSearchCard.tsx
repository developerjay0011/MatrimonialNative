import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function SkeletonSearchCard() {
    return (
        <SkeletonPlaceholder borderRadius={12}>
            <View style={styles.card}>
                <View style={styles.image} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.name} />
                        <View style={styles.heart} />
                    </View>
                    <View style={styles.detail} />
                    <View style={styles.detail} />
                    <View style={styles.detail} />
                    <View style={styles.footer}>
                        <View style={styles.tag} />
                        <View style={styles.tag} />
                        <View style={styles.match} />
                    </View>
                </View>
            </View>
        </SkeletonPlaceholder>
    );
}

export function SkeletonSearchList({ count = 3 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonSearchCard key={index} />
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    content: {
        flex: 1,
        marginLeft: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        width: 120,
        height: 20,
    },
    heart: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    detail: {
        width: '80%',
        height: 14,
        marginBottom: 6,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 8,
    },
    tag: {
        width: 50,
        height: 20,
        borderRadius: 10,
    },
    match: {
        width: 60,
        height: 20,
        borderRadius: 10,
        marginLeft: 'auto',
    },
});
