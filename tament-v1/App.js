import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import * as Notifications from 'expo-notifications';
import NavigationBar from 'expo-navigation-bar';

import ContextProviders from './contexts/ContextProviders';
import MainStack from './navigations/MainStack';
import HomeTab from './navigations/HomeTab';

import 'intl';
import 'intl/locale-data/jsonp/en';

import { store, persistor } from './store/configuredStore';
import { CombinedDefaultTheme, CombinedDarkTheme } from './utils/CombinedTheme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const theme = CombinedDefaultTheme;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ContextProviders>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <HomeTab />
            </NavigationContainer>
          </PaperProvider>
        </ContextProviders>
      </PersistGate>
    </Provider>
  );
}
