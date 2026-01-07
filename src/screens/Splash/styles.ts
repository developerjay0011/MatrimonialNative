import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    headerGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    mainGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
    },
    iconWrapper: {
        marginBottom: 24,
    },
    logoCircle: {
        width: 96,
        height: 96,
        backgroundColor: '#ffffff',
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 16,
    },
    logoEmoji: {
        fontSize: 48,
    },
    title: {
        fontSize: 36,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
    },
    loadingDotsContainer: {
        marginTop: 48,
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        marginHorizontal: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 32,
    },
    footerText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
    },
});
