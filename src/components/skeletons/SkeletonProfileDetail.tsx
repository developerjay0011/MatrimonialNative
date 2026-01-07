import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function SkeletonProfileDetail() {
    return (
        <SkeletonPlaceholder borderRadius={8}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backButton} />
                    <View style={styles.actions}>
                        <View style={styles.actionButton} />
                        <View style={styles.actionButton} />
                    </View>
                </View>
                <View style={styles.imageSection}>
                    <View style={styles.mainImage} />
                    <View style={styles.imageIndicators}>
                        <View style={styles.indicator} />
                        <View style={styles.indicator} />
                        <View style={styles.indicator} />
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.nameSection}>
                        <View style={styles.name} />
                        <View style={styles.badge} />
                    </View>
                    <View style={styles.location} />
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem} />
                        <View style={styles.infoItem} />
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem} />
                        <View style={styles.infoItem} />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.bio} />
                    <View style={styles.bio} />
                    <View style={styles.divider} />
                    <View style={styles.section}>
                        <View style={styles.sectionTitle} />
                        <View style={styles.sectionContent} />
                        <View style={styles.sectionContent} />
                    </View>
                </View>
            </View>
        </SkeletonPlaceholder>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        gap: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        alignItems: 'center',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    imageSection: {
        height: 400,
        marginBottom: 16,
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    imageIndicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginTop: 12,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    content: {
        padding: 16,
    },
    nameSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        width: 180,
        height: 28,
    },
    badge: {
        width: 80,
        height: 24,
        borderRadius: 12,
    },
    location: {
        width: 150,
        height: 18,
        marginBottom: 16,
    },
    divider: {
        width: '100%',
        height: 1,
        marginVertical: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoItem: {
        width: '48%',
        height: 60,
        borderRadius: 8,
    },
    bio: {
        width: '100%',
        height: 16,
        marginBottom: 8,
    },
    section: {
        marginTop: 16,
    },
    sectionTitle: {
        width: 120,
        height: 20,
        marginBottom: 12,
    },
    sectionContent: {
        width: '100%',
        height: 40,
        marginBottom: 8,
        borderRadius: 8,
    },
});
