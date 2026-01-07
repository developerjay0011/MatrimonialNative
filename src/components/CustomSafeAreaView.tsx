import React from 'react';
import { CustomStatusBar } from './CustomStatusBar';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomSafeAreaViewProps {
    children: React.ReactNode;
    barStyle?: 'light-content' | 'dark-content';
    style?: ViewStyle;
    edges?: ('top' | 'right' | 'bottom' | 'left')[];
    headerComponent?: (insets: EdgeInsets) => React.ReactNode;
    barColor?: string;
}

export const CustomSafeAreaView: React.FC<CustomSafeAreaViewProps> = ({
    children,
    barStyle,
    style,
    edges = ['top', 'right', 'bottom', 'left'],
    headerComponent,
    barColor,
}) => {
    const insets = useSafeAreaInsets()
    return (
        <>
            <CustomStatusBar backgroundColor={barColor || "#ffffff"} barStyle={barStyle} />
            <SafeAreaView
                style={[styles.container, style]}
                edges={edges}
            >
                {headerComponent ? headerComponent(insets) : null}
                {children}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
