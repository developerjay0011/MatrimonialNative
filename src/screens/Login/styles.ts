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
    },

    card: {
        marginHorizontal: 16,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },

    methodToggle: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 4,
        marginBottom: 24,
    },
    methodButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    methodButtonActive: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    methodText: {
        fontSize: 15,
        fontWeight: '400',
        color: '#6b7280',
    },
    methodTextActive: {
        fontWeight: '600',
        color: '#f97316',
    },

    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    phoneRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    countryCodeBox: {
        width: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        height: 48,
    },
    countryCodeText: {
        fontWeight: '500',
        color: '#374151',
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
    phoneInput: {
        flex: 1,
    },

    otpContainer: {
        marginBottom: 16,
    },
    otpInput: {
        width: '100%',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        height: 48,
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 4,
        marginBottom: 8,
        color: '#111827',
    },
    otpHint: {
        fontSize: 13,
        color: '#6b7280',
        textAlign: 'center',
    },

    primaryButton: {
        width: '100%',
        backgroundColor: '#f97316',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButtonDisabled: {
        backgroundColor: '#fed7aa',
    },
    primaryButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },

    buttonStack: {
        gap: 12,
    },
    centerAlign: {
        alignItems: 'center',
        marginTop: 15
    },
    linkText: {
        color: '#f97316',
        fontSize: 14,
        fontWeight: '500',
    },

    sectionSpacing: {
        marginBottom: 16,
    },
    sectionSpacingLarge: {
        marginBottom: 24,
    },

    registerContainer: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 32,
    },
    registerPrompt: {
        color: '#6b7280',
        fontSize: 15,
        marginBottom: 8,
    },
    registerLink: {
        color: '#f97316',
        fontWeight: '600',
        fontSize: 16,
    },
});
