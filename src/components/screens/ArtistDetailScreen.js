import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { Text, View, ScrollView } from 'react-native';
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
      <View style={{ padding: 10, borderBottomWidth: 2 }}>
        <Text style={StylesMain.eventMainText}>{artist.name}</Text>
      </View>
      <View style={{ padding: 10, borderBottomWidth: 2 }}>
        <Text style={StylesMain.eventDateText}>{artist.category}</Text>
      </View>
      <PoolbarImage
        imageId={artist.image}
        fallback={artistPlaceholder}
        style={{
          flex: 1,
          width: '100%',
          height: 320,
        }}
      />
      <View style={{ padding: 10, borderTopWidth: 2 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={StylesMain.text}>{artist.description}</Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
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
        {artist.website && (
          <AppButton
            style={{
              marginRight: 'auto',
              marginLeft: 0,
              marginBottom: 10,
            }}
            title="zur webseite"
            onPress={() => Linking.openURL(artist.website)}
          />
        )}
      </View>

      <View>
        <View style={{ flex: 1, borderTopWidth: 2, borderBottomWidth: 2, padding: 10 }}>
          <Text style={[StylesMain.artistDetailsDateText]}>bevorstehende events</Text>
        </View>
        <View style={{ flex: 1 }}>
          {filteredEvents.map((event) => (
            <EventComponent key={event.id} item={event} />
          ))}
        </View>
      </View>
    </View>
  );
};

const ArtistScreen = ({ route }) => {
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
        <NavBar title={'artist'} />
        <ScrollView style={{ flex: 1 }}>{selectedArtist ? <ArtistDetailScreen artist={selectedArtist} /> : <LoadingText />}</ScrollView>
      </FadeInView>
    </View>
  );
};

export default ArtistScreen;
