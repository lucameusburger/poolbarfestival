import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import LikeIcon from '../ui/LikeIcon';
import LoadingText from '../ui/LoadingText';
import { fetchEvent } from '../../redux/eventsThunk';
import { fetchArtists } from '../../redux/artistsThunk';
import { navigate } from '../../core/RootNavigation';

const EventDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const events = useSelector((state) => state.events.data);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const dispatch = useDispatch()
  const artists = useSelector((state) => state.artists.artists);

  const RenderElement = ({ item, artist }) => {
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
            <Text style={StylesMain.text}>{item?.room_item?.name}</Text>
            <LikeIcon
              eventId={item.id}
              color="#000"
              style={{ alignSelf: 'flex-end', marginRight: 10, marginBottom: 10 }}

            />
          </View>
        </View>

        <View style={{ padding: 20 }}>
          {item.url_ticket && <AppButton style={{ marginRight: 'auto', marginLeft: 0, marginBottom: 10, alignSelf: 'left' }} title="hol dir tickets" onPress={() => Linking.openURL(item.url_ticket)} />}
          {item.artist &&
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
    dispatch(fetchEvent(id));
    dispatch(fetchArtists());
  }, []);

  useEffect(() => {
    const event = events.find((event) => event.id === id);
    setSelectedEvent(event);
  }, [events]);

  useEffect(() => {
    if (selectedEvent) {
      const artist = artists.find((artist) => artist.id === selectedEvent.artist);
      setSelectedArtist(artist);
    }
  }, [selectedEvent, artists]);
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%' }}>
        <NavBar navigation={navigation} title={'event'} />
        <ScrollView style={{ flex: 1 }}>
          {(selectedEvent) ?
            <RenderElement
              item={selectedEvent}
              artist={selectedArtist}
            /> :
            <LoadingText />
          }
        </ScrollView>
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

export default EventDetailScreen;
