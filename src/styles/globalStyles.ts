import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    text: {
        fontFamily: 'System',
    },
    textRegular: {
        fontFamily: 'System',
        fontWeight: '400',
    },
    textMedium: {
        fontFamily: 'System',
        fontWeight: '500',
    },
    textSemibold: {
        fontFamily: 'System',
        fontWeight: '600',
    },
    textBold: {
        fontFamily: 'System',
        fontWeight: '700',
    },
});

// Default Text component props
export const defaultTextProps = {
    style: {
        fontFamily: 'System',
    },
};
