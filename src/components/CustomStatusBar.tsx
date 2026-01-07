import React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

interface CustomStatusBarProps {
    backgroundColor: string;
    barStyle?: 'default' | 'light-content' | 'dark-content';
}

export const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
    backgroundColor,
    barStyle = 'light-content',
}) => {
    const isFocused = useIsFocused();
    return isFocused ? (
        <StatusBar
            backgroundColor={backgroundColor}
            barStyle={barStyle}
            translucent={false}
            animated={true}
        />
    ) : null;
};
