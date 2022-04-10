import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, Image, openURL, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from '../modules/AppButton';
import AppHeading from '../modules/AppHeading';
import NavBar from '../modules/NavBar';
import FadeInView from '../modules/FadeInView';
import StylesMain from '../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import LoadingText from '../modules/LoadingText';

import { fetchArtist } from '../redux/artistsThunk';


const BASE_URL = 'https://www.admin.poolbar.at/';

const ArtistDetails = ({ artist }) => {
  const img = artist.image ?
    { uri: BASE_URL + 'assets/' + artist.image + '?fit=cover&width=500&height=200&quality=80' } :
    { uri: BASE_URL + 'assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ alignSelf: 'center' }}>
        <AppHeading title={artist.name} />
        {
          artist.url_spotify &&
          <AppButton
            title="play on spotify"
            onPress={() => Linking.openURL(artist.url_spotify)}
          />
        }
        <Image
          source={img}
          resizeMode="cover"
          style={{
            flex: 1,
            width: '100%',
            height: 300
          }}

        />
      </View>
    </View>
  );
};

const ArtistScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const artists = useSelector((state) => state.artists.artists);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchArtist(id));
  }, []);

  useEffect(() => {
    setSelectedArtist(artists.find((artist) => artist.id === id));
  }, [artists]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%' }}>
        <NavBar navigation={navigation} title={selectedArtist?.name} />
        <View style={{ marginBottom: 'auto', marginTop: 'auto', flex: 1 }}>
          {
            selectedArtist ?
              <ArtistDetails artist={selectedArtist} /> :
              <LoadingText />
          }
        </View>
        <StatusBar style="auto" />
      </FadeInView >
    </View >
  );
};

export default ArtistScreen;
