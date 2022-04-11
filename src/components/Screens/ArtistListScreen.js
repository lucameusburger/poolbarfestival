import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchArtists } from '../../redux/artistsThunk';
import { navigate } from '../../core/RootNavigation';

const BASE_URL = 'https://www.admin.poolbar.at/';

const ArtistListScreen = ({ item }) => {
  const img = item.image ? { uri: BASE_URL + 'assets/' + item.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: BASE_URL + 'assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

  return (
    <TouchableOpacity
      style={{ marginBottom: 30, padding: 10 }}
      key={item.id}
      onPress={() =>
        navigate('Artist', {
          id: item.id,
        })
      }
    >
      <View style={{ width: '100%', marginTop: 'auto', flexDirection: 'row' }}>
        <View style={{}}>
          <Image source={img} resizeMode="cover" style={{ width: 100, height: 100, borderRadius: 300, alignItems: 'center' }} />
        </View>
        <View style={{}}>
          <View style={{ marginLeft: 20, marginTop: 'auto', marginBottom: 'auto', width: '100%' }}>
            <Text style={StylesMain.eventDateText}>{item.category}</Text>
            <Text style={StylesMain.eventMainText}>{item.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ArtistsList = ({ artists }) => <FlatList style={{ flex: 1 }} data={artists} renderItem={ArtistListScreen} keyExtractor={(item) => item.id} />;

const ArtistsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const artists = useSelector((state) => state.artists.artists);
  const orderredArtists = artists.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  const isLoaded = useSelector((state) => state.artists.isLoaded);
  const isFetchingData = useSelector((state) => state.artists.isFetchingData);
  const hasFetchingDataError = useSelector((state) => state.artists.hasFetchingDataError);

  useEffect(() => {
    dispatch(fetchArtists());
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          navigation={navigation}
          title="artists"
          next={() => {
            navigation.navigate('ArtistHistory');
          }}
          nextTitle={'history'}
        />
        <View style={{ flex: 1 }}>{!isLoaded ? <LoadingText /> : artists ? <ArtistsList artists={orderredArtists} /> : <LoadingText />}</View>
        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default ArtistsScreen;
