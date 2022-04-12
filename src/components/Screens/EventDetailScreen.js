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

const EventDetailScreen = ({ route, navigation }) => {
  const id = route.params.id.trim();
  const events = useSelector((state) => state.events.data);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const dispatch = useDispatch()
  const artists = useSelector((state) => state.artists.artists);
  const venues = useSelector((state) => state.venues.data);

  const RenderElement = ({ item, artist, venue }) => {
    let dateString = 'tba';

    if (item.day_item && item.day_item.date_start) {
      let dateOptions = { month: 'long', day: 'numeric' };
      let date = new Date(item.day_item.date_start);
      dateString = date.toLocaleDateString('en-US', dateOptions).toUpperCase();
    }

    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={{ backgroundColor: '#c6c300', padding: 20, marginTop: 10 }}>
          <View>
            <Text style={styles.eventDateText}>{dateString}</Text>
            <Text style={styles.eventMainText}>{item.name}</Text>
            <Text style={StylesMain.text}>{item.description_short}</Text>
            <View style={{ height: 20 }}></View>
            <Text style={StylesMain.text}>{artist?.category}</Text>
            <Text style={StylesMain.text}>{venue?.name}</Text>
            <LikeIcon
              eventId={item.id}
              color="#000"
              style={{ alignSelf: 'flex-end', marginRight: 10, marginBottom: 10 }}

            />
          </View>
        </View>

        <View style={{ padding: 20 }}>
          {item.url_ticket &&
            <AppButton
              style={{
                marginRight: 'auto',
                marginLeft: 0,
                marginBottom: 10
              }}
              title="hol dir tickets"
              onPress={() => Linking.openURL(item.url_ticket)}
            />
          }
          {artist &&
            <AppButton
              style={{ marginRight: 'auto', marginLeft: 0, marginBottom: 10 }}
              title="artist ansehen"
              onPress={() =>
                navigate('Artist', {
                  id: item.artist,
                })
              }
            />
          }
          {item.room && (
            <AppButton
              style={{ marginRight: 'auto', marginLeft: 0 }}
              title="zur venue"
              onPress={() =>
                navigate('Room', {
                  id: item.room,
                })
              }
            />
          )}
        </View>
      </View>
    );
  };

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchArtists());
    dispatch(fetchVenues())
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
        <NavBar navigation={navigation} title={'event'} />
        <ScrollView style={{ flex: 1 }}>
          {(selectedEvent) ?
            <RenderElement
              item={selectedEvent}
              artist={selectedArtist}
              venue={selectedVenue}
            /> :
            <LoadingText />
          }
        </ScrollView>
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

export default EventDetailScreen;
