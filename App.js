import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, NativeModules, Platform, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import * as Linking from 'expo-linking';
import * as Sentry from 'sentry-expo';

import { navigationRef } from './src/core/RootNavigation';

import GeneratorListScreen from './src/components/screens/GeneratorListScreen';
import ArtistListScreen from './src/components/screens/ArtistListScreen';
import ArtistHistoryListScreen from './src/components/screens/ArtistHistoryListScreen';
import ArtistDetailScreen from './src/components/screens/ArtistDetailScreen';
import RoomDetailScreen from './src/components/screens/RoomDetailScreen';
import EventListScreen from './src/components/screens/EventListScreen';
import EventLikedListScreen from './src/components/screens/EventLikedListScreen';
import EventDetailScreen from './src/components/screens/EventDetailScreen';
import ScanScreen from './src/components/screens/ScanScreen';
import MapScreen from './src/components/screens/MapScreen';
import CreditsScreen from './src/components/screens/CreditsScreen';
import RaumfahrtDetailScreen from './src/components/screens/RaumfahrtDetailScreen';
import GeneratorInfoScreen from './src/components/screens/GeneratorInfoScreen';
import FlowtextScreen from './src/components/screens/FlowtextScreen';
import ScanCollectionScreen from './src/components/screens/ScanCollectionScreen';

import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './src/redux/store';

import { useFonts } from '@expo-google-fonts/outfit';
import HomeScreen from './src/components/screens/HomeScreen';
import { fetchEvents } from './src/redux/eventsThunk';
import { fetchArtists } from './src/redux/artistsThunk';
import { fetchVenues } from './src/redux/venueThunk';
import GeneratorDetailScreen from './src/components/screens/GeneratorDetailScreen';
import { fetchGenerators } from './src/redux/generatorsThunk';
import CaptureScreen from './src/components/screens/CaptureScreen';
import { fetchPOI } from './src/redux/poiThunk';

const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator();

Sentry.init({
  dsn: 'https://2a19ef9fa8a94e85bf68253dcd673713@o1240265.ingest.sentry.io/6392297',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

function Navigator() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchArtists());
    dispatch(fetchVenues());
    dispatch(fetchGenerators());
    dispatch(fetchPOI());
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="Events" component={EventListScreen} options={{ title: 'Events', headerShown: false }} />
      <Stack.Screen name="LikedEvents" component={EventLikedListScreen} options={{ title: 'LikedEvents', headerShown: false }} />
      <Stack.Screen name="Event" component={EventDetailScreen} options={{ title: 'Event', headerShown: false }} />
      <Stack.Screen name="Artists" component={ArtistListScreen} options={{ title: 'Artists', headerShown: false }} />
      <Stack.Screen name="ArtistHistory" component={ArtistHistoryListScreen} options={{ title: 'ArtistHistory', headerShown: false }} />
      <Stack.Screen name="Artist" component={ArtistDetailScreen} options={{ title: 'Artist', headerShown: false }} />
      <Stack.Screen name="Room" component={RoomDetailScreen} options={{ title: 'Room', headerShown: false }} />
      <Stack.Screen name="Generators" component={GeneratorListScreen} options={{ title: 'Generator', headerShown: false }} />
      <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan', headerShown: false }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Map', headerShown: false }} />
      <Stack.Screen name="Generator" component={GeneratorDetailScreen} options={{ title: 'Generator', headerShown: false }} />
      <Stack.Screen name="Flowtext" component={FlowtextScreen} options={{ title: 'Flowtext', headerShown: false }} />
      <Stack.Screen name="Capture" component={CaptureScreen} options={{ title: 'Capture', headerShown: false }} />
      <Stack.Screen name="Credits" component={CreditsScreen} options={{ title: 'Credits', headerShown: false }} />
      <Stack.Screen name="Raumfahrtprogramm" component={RaumfahrtDetailScreen} options={{ title: 'Raumfahrtprogramm', headerShown: false }} />
      <Stack.Screen name="GeneratorInfo" component={GeneratorInfoScreen} options={{ title: 'GeneratorInfo', headerShown: false }} />
      <Stack.Screen name="ScanCollection" component={ScanCollectionScreen} options={{ title: 'ScanCollection', headerShown: false }} />
    </Stack.Navigator>
  );
}

const App = () => {
  const [fontsLoaded] = useFonts({
    Helviotopia: require('./assets/fonts/Helviotopia/Helviotopia-Regular.otf'),
    HelviotopiaMedium: require('./assets/fonts/Helviotopia/Helviotopia-Medium.otf'),
    HelviotopiaSemibold: require('./assets/fonts/Helviotopia/Helviotopia-Semibold.otf'),
    HelviotopiaBold: require('./assets/fonts/Helviotopia/Helviotopia-Bold.otf'),
  });

  const linking = {
    prefixes: [prefix, 'poolbar://'],
    config: {
      screens: {
        Map: 'map',
        Event: {
          path: '/event/:id',
        },
        Artist: {
          path: '/artist/:id',
        },
        Generator: {
          path: '/generator/:id',
        },
        Home: '*',
      },
    },
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} ref={navigationRef}>
            <Navigator />
          </NavigationContainer>
          <StatusBar style="dark" />
        </PersistGate>
      </Provider>
    );
  }
};

export default App;
