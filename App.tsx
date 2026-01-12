import React from 'react';
import './src/i18n/config';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/RootNavigation';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  return (
    <RootSiblingParent>
      <GestureHandlerRootView>
        <Provider store={store}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
}
