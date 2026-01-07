import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        backgroundColor: '#f97316',
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ffffff',
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9ca3af',
        paddingHorizontal: 16,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    sectionContent: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuItemText: {
        flex: 1,
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    menuItemSubtitle: {
        fontSize: 14,
        color: '#9ca3af',
        marginTop: 2,
    },
    appInfo: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    appInfoText: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },
    appVersion: {
        fontSize: 12,
        color: '#9ca3af',
    },
});
