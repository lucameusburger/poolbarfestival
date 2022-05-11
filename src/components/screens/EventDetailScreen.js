import { useState, useEffect } from 'react';
import * as Linking from 'expo-linking';
import { Text, View, ScrollView } from 'react-native';
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
import PoolbarImage from '../ui/PoolbarImage';

import artistPlaceholder from '../../../assets/img/artistPlaceholder.jpg';

const EventDetail = ({ item, artist, venue }) => {
  const time_show_start = item.time_show_start ? ' - ' + item.time_show_start.slice(0, -3) : '';

  const dateString = item.day_item.date_start ? getDateString(new Date(item.day_item.date_start)) + time_show_start : 'tba';

  const today = new Date();
  const date = new Date(item.day_item.date_start);
  const isToday = date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear() ? true : false;

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ flex: 1, width: '100%', padding: 10, borderBottomWidth: 2 }}>
        <Text style={StylesMain.detailsMainText}>{item.name}</Text>
      </View>

      <View style={{ flex: 1, width: '100%', padding: 10, flexDirection: 'row', borderBottomWidth: 2 }}>
        <View>
          <Text style={[StylesMain.detailsDateText, { backgroundColor: isToday ? '#00ff00' : '#ffffff', alignSelf: 'flex-start' }]}>{isToday ? 'HEUTE' + time_show_start : dateString}</Text>
        </View>
        <View style={{ flex: 1 }}>{item.soldout && <Text style={[StylesMain.detailsDateText, { backgroundColor: '#00ff00', alignSelf: 'flex-end' }]}>SOLD OUT</Text>}</View>
      </View>

      <PoolbarImage
        imageId={artist?.image}
        fallback={artistPlaceholder}
        style={{
          flex: 1,
          width: '100%',
          height: 320,
        }}
      />

      <View style={{ padding: 10, borderTopWidth: 2 }}>
        <View>
          <Text style={StylesMain.text}>{item.description_short}</Text>
          <View style={{ height: 20 }}></View>
          <Text style={[StylesMain.text, { fontFamily: 'HelviotopiaBold' }]}>
            {artist?.category ? '#' + artist.category + ' ' : ''}
            {venue?.name ? '#' + venue.name : ''}
          </Text>
        </View>
      </View>

      <View style={{ padding: 10, marginBottom: 30 }}>
        <LikeIcon
          eventId={item.id}
          mode={'button'}
          style={{
            marginRight: 'auto',
            marginLeft: 0,
            alignSelf: 'flex-start',
            marginBottom: 10,
          }}
        />
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
            title="stage ansehen"
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

const EventDetailScreen = ({ route }) => {
  const id = route.params.id.trim();

  const events = useSelector((state) => state.events.data);
  const artists = useSelector((state) => state.artists.artists);
  const venues = useSelector((state) => state.venues.data);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchArtists());
    dispatch(fetchVenues());
  }, []);

  useEffect(() => {
    setSelectedEvent(events.find((event) => event.id === id));
  }, [events]);

  useEffect(() => {
    if (selectedEvent) {
      setSelectedArtist(artists.find((artist) => artist.id === selectedEvent.artist));
      setSelectedVenue(venues.find((venue) => venue.id === selectedEvent.room));
    }
  }, [selectedEvent]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%' }}>
        <NavBar title={'event'} />
        <ScrollView style={{ flex: 1 }}>{selectedEvent ? <EventDetail item={selectedEvent} artist={selectedArtist} venue={selectedVenue} /> : <LoadingText />}</ScrollView>
      </FadeInView>
    </View>
  );
};

export default EventDetailScreen;
