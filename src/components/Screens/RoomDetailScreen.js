import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import PoolbarImage from '../ui/PoolbarImage';
import { fetchVenue } from '../../redux/venueThunk';
import LoadingText from '../ui/LoadingText';
import EventComponent from '../ui/EventComponent';

const RenderElement = ({ venue }) => {
  const events = useSelector((state) => state.events.data);
  const filteredEvents = events.filter((event) => event.room === venue.id);
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ padding: 20, marginTop: 10 }}>
        <View>
          <Text style={styles.roomDateText}>poolbar</Text>
          <Text style={styles.roomMainText}>{venue.name}</Text>
          <Text style={StylesMain.text}>{venue.description}</Text>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
      <PoolbarImage
        imageId={venue.image}
        style={{
          flex: 1,
          width: '100%',
          height: 320,
          marginBottom: 30,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={[StylesMain.artistDetailsDateText, { marginBottom: 20, marginHorizontal: 20 }]}>kommende events</Text>
        <View style={{ flex: 1, borderTopWidth: 2 }}>
          {filteredEvents.map((event) => (
            <EventComponent item={event} key={event.id} />
          ))}
        </View>
      </View>
    </View>
  );
};

const RoomDetailScreen = ({ route, navigation }) => {
  const id = route.params.id.trim();
  const venues = useSelector((state) => state.venues.data);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVenue());
  }, []);

  useEffect(() => {
    const venue = venues.find((venue) => venue.id === id);
    setSelectedVenue(venue);
  }, [venues]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%' }}>
        <NavBar navigation={navigation} title={'venue'} />
        <ScrollView style={{ flex: 1 }}>{selectedVenue ? <RenderElement venue={selectedVenue} /> : <LoadingText />}</ScrollView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  roomDateText: {
    fontFamily: 'HelviotopiaBold',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 24,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  roomMainText: {
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

export default RoomDetailScreen;
