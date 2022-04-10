import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Item, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from './modules/AppButton';
import AppLoading from 'expo-app-loading';
import FadeInView from './modules/FadeInView';
import ArtistsScreen from './components/ArtistsScreen';
import ArtistScreen from './components/ArtistScreen';
import EventsScreen from './components/EventsScreen';
import ScanScreen from './components/ScanScreen';
import StylesMain from './styles/StylesMain';
import PoolbarLogo from './components/PoolbarLogo';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

import { useFonts, Outfit_900Black } from '@expo-google-fonts/outfit';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ display: 'block', flex: 1, width: '100%', height: '100%' }}>
        <View style={{ top: 0, flex: 1, height: '60%' }}>
          <PoolbarLogo style={{ alignSelf: 'center', marginBottom: 'auto', marginTop: 'auto' }} width="80%" height="100%" fill="black" />
        </View>
        <View style={{ top: 0, marginTop: 0, marginBottom: 'auto', height: '40%' }}>
          <AppButton title="events" onPress={() => navigation.navigate('Events')} />
          <View style={{ height: 20 }}></View>
          <AppButton title="artists" onPress={() => navigation.navigate('Artists')} />
          <View style={{ height: 20 }}></View>
          <AppButton title="scan" onPress={() => navigation.navigate('Scan')} />
        </View>
      </FadeInView>
      <StatusBar style="auto" />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Helviotopia: require('./assets/fonts/Helviotopia/Helviotopia-Regular.otf'),
  });

  const linking = {
    prefixes: [prefix],
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome', headerShown: false }} />
          <Stack.Screen name="Events" component={EventsScreen} />
          <Stack.Screen name="Artists" component={ArtistsScreen} />
          <Stack.Screen name="Artist" component={ArtistScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
