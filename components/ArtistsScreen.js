import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../modules/NavBar';
import LoadingText from '../modules/LoadingText';
import FadeInView from '../modules/FadeInView';
import StylesMain from '../styles/StylesMain';
import fetchArtists from '../redux/artistsThunk';
import { navigate } from '../core/RootNavigation';

const BASE_URL = 'https://www.admin.poolbar.at/';

const ArtistComponent = ({ item }) => {
  const img = item.image ? { uri: BASE_URL + 'assets/' + item.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: BASE_URL + '/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

  return (
    <TouchableOpacity
      onPress={() =>
        navigate('Artist', {
          id: item.id,
        })
      }
    >
      <View style={{ flex: 1, width: '100%' }}>
        <ImageBackground source={img} resizeMode="cover" style={{ width: '100%', height: 300, alignItems: 'center' }}>
          <View style={StylesMain.labelContainer}>
            <Text style={StylesMain.labelText}>{item.name}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const ArtistsList = ({ artists }) => <FlatList style={{ flex: 1 }} data={artists} renderItem={ArtistComponent} keyExtractor={(item) => item.id} />;

const ArtistsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const artists = useSelector((state) => state.artists.artists);
  const isLoaded = useSelector((state) => state.artists.isLoaded);
  const isFetchingData = useSelector((state) => state.artists.isFetchingData);
  const hasFetchingDataError = useSelector((state) => state.artists.hasFetchingDataError);

  useEffect(() => {
    dispatch(fetchArtists());
  }, []);
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="artists" />
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>{!isLoaded ? <LoadingText /> : artists ? <ArtistsList artists={artists} /> : <LoadingText />}</View>
        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default ArtistsScreen;
