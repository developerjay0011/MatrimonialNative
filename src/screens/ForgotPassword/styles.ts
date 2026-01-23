import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        flexGrow: 1,
    },

    headerWrapper: {
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
        marginBottom: -40,
    },
    headerGradient: {
        paddingBottom: 100,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    logoContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#ffffff',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    logoText: {
        fontSize: 40,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
    },

    card: {
        marginHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },

    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    textInput: {
        width: '100%',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        height: 48,
        fontSize: 15,
        color: '#111827',
    },

    primaryButton: {
        width: '100%',
        backgroundColor: '#f97316',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    primaryButtonDisabled: {
        backgroundColor: '#fed7aa',
    },
    primaryButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },

    backButton: {
        gap: 5,
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backButtonText: {
        color: '#6b7280',
        fontSize: 15,
        fontWeight: '500',
    },

    sectionSpacing: {
        marginBottom: 16,
    },
});
