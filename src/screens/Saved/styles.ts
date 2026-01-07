import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        justifyContent: 'space-between',
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    tab: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '50%',
        flexShrink: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    activeTab: {
        backgroundColor: '#ffffff',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.9)',
    },
    activeTabText: {
        color: '#f97316',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    removeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    profileImage: {
        width: '100%',
        height: 320,
        backgroundColor: '#e5e7eb',
    },
    verifiedBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#3b82f6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    verifiedText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
    onlineBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    onlineText: {
        color: '#22c55e',
        fontSize: 12,
        fontWeight: '600',
    },
    matchBadge: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#f97316',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    profileImageContainer: {
        position: 'relative',
    },
    matchText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
    profileInfo: {
        padding: 16,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        justifyContent: 'space-between',
    },

    profileName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginRight: 8,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22c55e',
    },
    profileDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    profileDetailText: {
        fontSize: 14,
        color: '#6b7280',
    },
    profileTags: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
        marginBottom: 12,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
    },
    tagText: {
        fontSize: 12,
        color: '#6b7280',
    },
    profileBio: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    viewProfileButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f97316',
        alignItems: 'center',
    },
    viewProfileText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#f97316',
    },
    messageButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#f97316',
        alignItems: 'center',
    },
    messageButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#ffffff',
    },
});
