import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, MessageCircle, Heart, Settings } from 'lucide-react-native';
import { HomeScreen } from '../screens/Home';
import { SearchScreen } from '../screens/Search';
import { ChatsListScreen } from '../screens/Chats';
import { ShortlistedScreen } from '../screens/Saved';
import { SettingsScreen } from '../screens/Settings';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
    currentUser: any;
    onViewProfile: (profileId: string) => void;
    onOpenChat: (profileId: string) => void;
    onOpenSettings: () => void;
    onEditProfile: () => void;
    onProfileVisibility: () => void;
    onPrivacySettings: () => void;
    onNotifications: () => void;
    onLanguage: () => void;
    onHelpSupport: () => void;
    onSafetyTips: () => void;
    onDeactivate: () => void;
    onLogout: () => void;
}

export function TabNavigator({
    currentUser,
    onViewProfile,
    onOpenChat,
    onEditProfile,
    onProfileVisibility,
    onPrivacySettings,
    onNotifications,
    onLanguage,
    onHelpSupport,
    onSafetyTips,
    onDeactivate,
    onLogout,
}: TabNavigatorProps) {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#f97316',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#e5e7eb',
                    height: 65 + insets.bottom,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarItemStyle: {
                    alignItems: 'center',
                    flexDirection: 'row',
                }
            }}
        >
            <Tab.Screen
                name="HomeTab"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
            >
                {(props) => (
                    <HomeScreen
                        {...props}
                        onViewProfile={onViewProfile}
                        onOpenSearch={() => props.navigation.navigate('SearchTab')}
                        onOpenChats={() => props.navigation.navigate('ChatsTab')}
                        onOpenSettings={() => props.navigation.navigate('SettingsTab')}
                        onOpenShortlisted={() => props.navigation.navigate('SavedTab')}
                        currentUser={currentUser}
                    />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="SearchTab"
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
                }}
            >
                {(props) => (
                    <SearchScreen
                        {...props}
                        onBack={() => props.navigation.navigate('HomeTab')}
                        onViewProfile={onViewProfile}
                    />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="ChatsTab"
                options={{
                    tabBarLabel: 'Chats',
                    tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
                }}
            >
                {(props) => (
                    <ChatsListScreen
                        {...props}
                        onBack={() => props.navigation.navigate('HomeTab')}
                        onOpenChat={onOpenChat}
                    />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="SavedTab"
                options={{
                    tabBarLabel: 'Saved',
                    tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
                }}
            >
                {(props) => (
                    <ShortlistedScreen
                        {...props}
                        onBack={() => props.navigation.navigate('HomeTab')}
                        onViewProfile={onViewProfile}
                    />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="SettingsTab"
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
                }}
            >
                {(props) => (
                    <SettingsScreen
                        {...props}
                        onBack={() => props.navigation.navigate('HomeTab')}
                        onEditProfile={onEditProfile}
                        onProfileVisibility={onProfileVisibility}
                        onPrivacySettings={onPrivacySettings}
                        onNotifications={onNotifications}
                        onLanguage={onLanguage}
                        onHelpSupport={onHelpSupport}
                        onSafetyTips={onSafetyTips}
                        onDeactivate={onDeactivate}
                        onLogout={onLogout}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
