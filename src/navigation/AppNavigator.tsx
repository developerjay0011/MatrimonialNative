import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';

import { SplashScreen } from '../screens/Splash';
import { LoginScreen } from '../screens/Login';
import { RegistrationFlow } from '../screens/Registration';
import { ProfileDetailScreen } from '../screens/ProfileDetail';
import { ChatScreen } from '../screens/Chat';
import { EditProfileScreen } from '../screens/EditProfile';
import { ProfileVisibilityScreen } from '../screens/ProfileVisibility';
import { PrivacySettingsScreen } from '../screens/PrivacySettings';
import { NotificationsScreen } from '../screens/Notifications';
import { LanguageScreen } from '../screens/Language';
import { HelpSupportScreen } from '../screens/HelpSupport';
import { SafetyTipsScreen } from '../screens/SafetyTips';
import { FamilyInfoScreen } from '../screens/FamilyInfo';
import { ManageGalleryScreen } from '../screens/ManageGallery';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
    const [currentUser, setCurrentUser] = useState<any>(null);

    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login">
                {(props) => (
                    <LoginScreen
                        {...props}
                        onRegister={() => props.navigation.navigate('Registration')}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="Registration">
                {(props) => (
                    <RegistrationFlow
                        {...props}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="Home">
                {(props) => (
                    <TabNavigator
                        currentUser={currentUser}
                        onViewProfile={(profileId) => props.navigation.navigate('ProfileDetail', { profileId })}
                        onOpenChat={(profileId) => props.navigation.navigate('Chat', { profileId })}
                        onOpenSettings={() => { }}
                        onEditProfile={() => props.navigation.navigate('EditProfile')}
                        onFamilyInfo={() => props.navigation.navigate('FamilyInfo')}
                        onManageGallery={() => props.navigation.navigate('ManageGallery')}
                        onProfileVisibility={() => props.navigation.navigate('ProfileVisibility')}
                        onPrivacySettings={() => props.navigation.navigate('PrivacySettings')}
                        onNotifications={() => props.navigation.navigate('Notifications')}
                        onLanguage={() => props.navigation.navigate('Language')}
                        onHelpSupport={() => props.navigation.navigate('HelpSupport')}
                        onSafetyTips={() => props.navigation.navigate('SafetyTips')}
                        onDeactivate={() => {
                            setCurrentUser(null);
                            props.navigation.replace('Login');
                        }}
                        onLogout={() => {
                            setCurrentUser(null);
                            props.navigation.replace('Login');
                        }}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="ProfileDetail">
                {(props) => (
                    <ProfileDetailScreen
                        {...props}
                        profileId={props.route.params.profileId}
                        onBack={() => props.navigation.goBack()}
                        onOpenChat={(profileId) => props.navigation.navigate('Chat', { profileId })}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="Chat">
                {(props) => (
                    <ChatScreen
                        {...props}
                        profileId={props.route.params.profileId}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="EditProfile">
                {(props) => (
                    <EditProfileScreen
                        {...props}
                        onBack={() => props.navigation.goBack()}
                        currentUser={currentUser}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="ProfileVisibility">
                {(props) => (
                    <ProfileVisibilityScreen
                        {...props}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="PrivacySettings">
                {(props) => (
                    <PrivacySettingsScreen
                        {...props}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="Notifications">
                {(props) => (
                    <NotificationsScreen
                        {...props}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="Language">
                {(props) => (
                    <LanguageScreen
                        {...props}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="HelpSupport">
                {(props) => (
                    <HelpSupportScreen
                        {...props}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="SafetyTips">
                {(props) => (
                    <SafetyTipsScreen
                        {...props}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="FamilyInfo">
                {(props) => (
                    <FamilyInfoScreen
                        {...props}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="ManageGallery">
                {(props) => (
                    <ManageGalleryScreen
                        {...props}
                        onBack={() => props.navigation.goBack()}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
