import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, ScrollView, Item, FlatList, ImageBackground, Image, openURL, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from '../ui/AppButton';
import AppHeading from '../ui/AppHeading';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArtist } from '../../redux/artistsThunk';

const BASE_URL = 'https://www.admin.poolbar.at/';

const ArtistDetailScreen = ({ artist }) => {
  const img = artist.image ? { uri: BASE_URL + 'assets/' + artist.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: BASE_URL + 'assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ backgroundColor: '#c6c300', padding: 20, marginTop: 10 }}>
        <View>
          <Text style={styles.eventDateText}>{artist.category}</Text>
          <Text style={styles.eventMainText}>{artist.name}</Text>
          <Text style={StylesMain.text}>{artist.description}</Text>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
      <Image
        source={img}
        resizeMode="cover"
        style={{
          flex: 1,
          width: '100%',
          height: 300,
        }}
      />

      <View style={{ padding: 20 }}>{artist.url_spotify && <AppButton style={{ marginRight: 'auto', marginLeft: 0, marginBottom: 10, alignSelf: 'left' }} title="auf spotify spielen" onPress={() => Linking.openURL(artist.url_spotify)} />}</View>
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
        <NavBar navigation={navigation} title={'artist'} />
        <ScrollView style={{ flex: 1 }}>{selectedArtist ? <ArtistDetailScreen artist={selectedArtist} /> : <LoadingText />}</ScrollView>
        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  eventDateText: {
    fontFamily: 'HelviotopiaBold',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 24,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  eventMainText: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 32,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});

export default ArtistScreen;
