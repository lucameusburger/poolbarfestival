import React, { useState, useEffect } from 'react';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import LikeIcon from '../ui/LikeIcon';
import LoadingText from '../ui/LoadingText';
import { fetchEvents } from '../../redux/eventsThunk';
import { fetchArtists } from '../../redux/artistsThunk';
import { navigate } from '../../core/RootNavigation';
import { fetchVenues } from '../../redux/venueThunk';
import { getDateString } from '../../core/helpers';

const EventDetailScreen = ({ route }) => {
  const id = route.params.id.trim();
  const events = useSelector((state) => state.events.data);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists.artists);
  const venues = useSelector((state) => state.venues.data);

  const RenderElement = ({ item, artist, venue }) => {
    const dateString = item.day_item.date_start ? getDateString(new Date(item.day_item.date_start)) : 'tba';

    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <LikeIcon
          eventId={item.id}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1000,
          }}
        />

        <View style={{ padding: 20, marginTop: 10 }}>
          <View>
            <Text style={styles.eventDateText}>{dateString}</Text>
            <Text style={styles.eventMainText}>{item.name}</Text>
            <Text style={StylesMain.text}>{item.description_short}</Text>
            <View style={{ height: 20 }}></View>
            <Text style={StylesMain.text}>{artist?.category}</Text>
            <Text style={StylesMain.text}>{venue?.name}</Text>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          {item.url_ticket && (
            <AppButton
              style={{
                marginRight: 'auto',
                marginLeft: 0,
                marginBottom: 10,
              }}
              title="hol dir tickets"
              onPress={() => Linking.openURL(item.url_ticket)}
              bevelLeft={true}
            />
          )}
          {artist && (
            <AppButton
              style={{ marginRight: 'auto', marginLeft: 0, marginBottom: 10 }}
              title="artist ansehen"
              onPress={() =>
                navigate('Artist', {
                  id: item.artist,
                })
              }
            />
          )}
          {item.room && (
            <AppButton
              style={{ marginRight: 'auto', marginLeft: 0 }}
              title="zur venue"
              onPress={() =>
                navigate('Room', {
                  id: item.room,
                })
              }
              bevelLeft={true}
            />
          )}
        </View>
      </View>
    );
  };

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchArtists());
    dispatch(fetchVenues());
  }, []);

  useEffect(() => {
    const event = events.find((event) => event.id === id);
    const artist = artists.find((artist) => artist.id === event.artist);
    const venue = venues.find((venue) => venue.id === event.room);

    setSelectedArtist(artist);
    setSelectedEvent(event);
    setSelectedVenue(venue);
  }, [events]);

  useEffect(() => {
    if (selectedEvent) {
      const artist = artists.find((artist) => artist.id === selectedEvent.artist);
      const venue = venues.find((venue) => venue.id === selectedEvent.room);

      setSelectedArtist(artist);
      setSelectedVenue(venue);
    }
  }, [selectedEvent, artists, venues]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%' }}>
        <NavBar title={'event'} />
        <ScrollView style={{ flex: 1 }}>{selectedEvent ? <RenderElement item={selectedEvent} artist={selectedArtist} venue={selectedVenue} /> : <LoadingText />}</ScrollView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  eventDateText: {
    fontFamily: 'HelviotopiaBold',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 20,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  eventMainText: {
    fontFamily: 'Helviotopia',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 42,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});

export default EventDetailScreen;
