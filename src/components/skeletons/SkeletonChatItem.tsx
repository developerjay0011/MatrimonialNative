import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function SkeletonChatItem() {
    return (
        <SkeletonPlaceholder borderRadius={8}>
            <View style={styles.chatItem}>
                <View style={styles.avatar} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.name} />
                        <View style={styles.time} />
                    </View>
                    <View style={styles.location} />
                    <View style={styles.message} />
                </View>
            </View>
        </SkeletonPlaceholder>
    );
}

export function SkeletonChatList({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonChatItem key={index} />
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    chatItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    content: {
        flex: 1,
        marginLeft: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    name: {
        width: 120,
        height: 18,
    },
    time: {
        width: 50,
        height: 14,
    },
    location: {
        width: 180,
        height: 14,
        marginBottom: 6,
    },
    message: {
        width: '90%',
        height: 16,
    },
});
