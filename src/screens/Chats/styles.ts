import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#ffffff',
    },
    scrollView: {
        flex: 1,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#e5e7eb',
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 0,
        right: -1,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#22c55e',
        borderWidth: 3,
        borderColor: '#ffffff',
    },
    chatContent: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    chatTime: {
        fontSize: 12,
        color: '#9ca3af',
    },
    chatLocation: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 4,
    },
    chatMessage: {
        fontSize: 14,
        color: '#6b7280',
    },
    unreadBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f97316',
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ffffff',
    },
    moreButton: {
        padding: 4,
    },
    selectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    closeButton: {
        padding: 4,
    },
    chatItemSelected: {
        backgroundColor: '#fef3f2',
    },
    selectionCheckbox: {
        position: 'absolute',
        bottom: 0,
        right: -2,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#d1d5db',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    checkboxSelected: {
        backgroundColor: '#f97316',
        borderColor: '#f97316',
    },
    checkmark: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionMenu: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        width: '80%',
        maxWidth: 300,
        overflow: 'hidden',
    },
    actionMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    actionMenuText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    actionMenuDivider: {
        height: 1,
        backgroundColor: '#f3f4f6',
    },
});
