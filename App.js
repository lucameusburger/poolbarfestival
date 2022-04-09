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

import { useFonts, Outfit_900Black } from '@expo-google-fonts/outfit';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ display: 'block', flex: 1, width: '100%', height: '100%' }}>
        <View style={{ top: 0, flex: 1, height: '60%' }}>
          <PoolbarLogo style={{ alignSelf: 'center', marginBottom: 'auto', marginTop: 'auto' }} width="80%" height="100%" fill="black" />
        </View>
        <View style={{ top: 0, marginTop: 0, marginBottom: 'auto', height: '40%' }}>
          <TouchableOpacity style={StylesMain.buttonMain} onPress={() => navigation.navigate('Events')}>
            <Text style={StylesMain.buttonMainText}>events</Text>
          </TouchableOpacity>
          <View style={{ height: 20 }}></View>
          <TouchableOpacity style={StylesMain.buttonMain} onPress={() => navigation.navigate('Artists')}>
            <Text style={StylesMain.buttonMainText}>artists</Text>
          </TouchableOpacity>
          <View style={{ height: 20 }}></View>
          <TouchableOpacity style={StylesMain.buttonMain} onPress={() => navigation.navigate('Scan')}>
            <Text style={StylesMain.buttonMainText}>scan</Text>
          </TouchableOpacity>
        </View>
      </FadeInView>
      <StatusBar style="auto" />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Outfit_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
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
