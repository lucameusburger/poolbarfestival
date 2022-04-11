import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchArtists } from '../../redux/artistsThunk';
import { navigate } from '../../core/RootNavigation';

const BASE_URL = 'https://www.admin.poolbar.at/';

const ArtistHistoryListScreen = ({ item }) => {
  const img = item.image ? { uri: BASE_URL + 'assets/' + item.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: BASE_URL + 'assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

  return <Text style={{ display: 'inline-block' }}>{item.name} // </Text>;
};

const ArtistsList = ({ artists }) => {
  let text = '';
  artists.forEach((item) => {
    text += item.name + ' //';
  });
  return <Text style={StylesMain.artistHistory}>{text}</Text>;
};

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
        <NavBar navigation={navigation} title="history" />
        <ScrollView style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto', padding: 10 }}>{!isLoaded ? <LoadingText /> : artists ? <ArtistsList artists={artists} /> : <LoadingText />}</ScrollView>
        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default ArtistsScreen;
