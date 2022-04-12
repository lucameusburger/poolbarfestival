import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import * as Linking from 'expo-linking';

import { navigationRef } from './src/core/RootNavigation';


import GeneratorListScreen from './src/components/Screens/GeneratorListScreen';
import ArtistListScreen from './src/components/Screens/ArtistListScreen';
import ArtistHistoryListScreen from './src/components/Screens/ArtistHistoryListScreen';
import ArtistDetailScreen from './src/components/Screens/ArtistDetailScreen';
import EventListScreen from './src/components/Screens/EventListScreen';
import EventLikedListScreen from './src/components/Screens/EventLikedListScreen';
import EventDetailScreen from './src/components/Screens/EventDetailScreen';
import ScanScreen from './src/components/Screens/ScanScreen';
import MapScreen from './src/components/Screens/MapScreen';


import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './src/redux/store';

const prefix = Linking.createURL('/');

import { useFonts } from '@expo-google-fonts/outfit';
import HomeScreen from './src/components/Screens/HomeScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Helviotopia: require('./assets/fonts/Helviotopia/Helviotopia-Regular.otf'),
    HelviotopiaMedium: require('./assets/fonts/Helviotopia/Helviotopia-Medium.otf'),
    HelviotopiaSemibold: require('./assets/fonts/Helviotopia/Helviotopia-Semibold.otf'),
    HelviotopiaBold: require('./assets/fonts/Helviotopia/Helviotopia-Bold.otf'),
  });

  const linking = {
    prefixes: [prefix],
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome', headerShown: false }} />
              <Stack.Screen name="Events" component={EventListScreen} options={{ title: 'Events', headerShown: false }} />
              <Stack.Screen name="LikedEvents" component={EventLikedListScreen} options={{ title: 'LikedEvents', headerShown: false }} />
              <Stack.Screen name="Event" component={EventDetailScreen} options={{ title: 'Event', headerShown: false }} />
              <Stack.Screen name="Artists" component={ArtistListScreen} options={{ title: 'Artists', headerShown: false }} />
              <Stack.Screen name="ArtistHistory" component={ArtistHistoryListScreen} options={{ title: 'ArtistHistory', headerShown: false }} />
              <Stack.Screen name="Artist" component={ArtistDetailScreen} options={{ title: 'Artist', headerShown: false }} />
              <Stack.Screen name="Generators" component={GeneratorListScreen} options={{ title: 'Generator', headerShown: false }} />
              <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan', headerShown: false }} />
              <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Map', headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </PersistGate>
      </Provider>
    );
  }
};

export default App;
