import React from 'react';
import './src/i18n/config';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/RootNavigation';
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from 'toastify-react-native/components/ToastManager';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
      <ToastManager />
    </Provider>
  );
}
