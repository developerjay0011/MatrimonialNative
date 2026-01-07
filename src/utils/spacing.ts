import { Platform, StatusBar } from 'react-native';

/**
 * Get the status bar height based on platform
 */
export const getStatusBarHeight = (): number => {
    if (Platform.OS === 'ios') {
        return 44; // Standard iOS status bar height
    }
    return StatusBar.currentHeight || 24; // Android status bar height
};

/**
 * Calculate header padding top including status bar height
 * @param contentPadding - Additional padding for content (default: 30)
 * @returns Total padding including status bar height
 */
export const getHeaderPaddingTop = (contentPadding: number = 30): number => {
    return getStatusBarHeight() + contentPadding;
};

/**
 * Get just the content padding without status bar
 * Use this for screens where SafeAreaView handles the status bar
 * @param padding - Content padding (default: 30)
 * @returns Content padding value
 */
export const getContentPadding = (padding: number = 30): number => {
    return padding;
};

/**
 * Common spacing values used throughout the app
 */
export const SPACING = {
    // Status bar
    statusBarHeight: getStatusBarHeight(),

    // Header padding (with status bar for LinearGradient headers)
    headerPaddingWithStatusBar: getHeaderPaddingTop(30),

    // Content padding (without status bar for regular headers)
    headerPaddingContent: 30,

    // Standard spacing
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};
