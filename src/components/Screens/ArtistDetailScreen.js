import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArtist } from '../../redux/artistsThunk';
import PoolbarImage from '../ui/PoolbarImage';

import artistPlaceholder from '../../../assets/img/artistPlaceholder.jpg';
import EventComponent from '../ui/EventComponent';

const ArtistDetailScreen = ({ artist }) => {
  const events = useSelector((state) => state.events.data);
  const filteredEvents = events.filter((event) => event.artist === artist.id);
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
      <PoolbarImage
        imageId={artist.image}
        fallback={artistPlaceholder}
        style={{
          flex: 1,
          width: '100%',
          height: 300,
        }}
      />
      <View style={{ flex: 1, padding: 20 }}>
        {filteredEvents.map((event) => (
          <EventComponent item={event} />
        ))}
      </View>

      <View style={{ padding: 20 }}>
        {artist.url_spotify && (
          <AppButton
            style={{
              marginRight: 'auto',
              marginLeft: 0,
              marginBottom: 10,
            }}
            title="auf spotify spielen"
            onPress={() => Linking.openURL(artist.url_spotify)}
          />
        )}
      </View>
    </View>
  );
};

const ArtistScreen = ({ route, navigation }) => {
  const id = route.params.id.trim();
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
