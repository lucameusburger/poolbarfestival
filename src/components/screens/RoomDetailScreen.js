import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import PoolbarImage from '../ui/PoolbarImage';
import { fetchVenue } from '../../redux/venueThunk';
import LoadingText from '../ui/LoadingText';
import EventComponent from '../ui/EventComponent';

import artistPlaceholder from '../../../assets/img/artistPlaceholder.jpg';

const RenderElement = ({ venue }) => {
  const events = useSelector((state) => state.events.data);
  const filteredEvents = events.filter((event) => event.room === venue.id);
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ padding: 10, borderBottomWidth: 2 }}>
        <Text style={StylesMain.detailsMainText}>{venue.name}</Text>
      </View>
      <View style={{ padding: 10, borderBottomWidth: 2 }}>
        <Text style={StylesMain.detailsDateText}>poolbar</Text>
      </View>
      <PoolbarImage
        imageId={venue.image}
        fallback={artistPlaceholder}
        style={{
          flex: 1,
          width: '100%',
          padding: 0,
        }}
      />
      {venue.description && (
        <View style={{ padding: 10, borderTopWidth: 2 }}>
          <View style={{ marginBottom: 0 }}>
            <Text style={StylesMain.text}>{venue.description}</Text>
          </View>
        </View>
      )}

      <View>
        <View style={{ flex: 1, borderTopWidth: 2, borderBottomWidth: 2, padding: 10 }}>
          <Text style={[StylesMain.detailsDateText]}>bevorstehende events</Text>
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
        <NavBar navigation={navigation} title={'stage'} />
        <ScrollView style={{ flex: 1 }}>{selectedVenue ? <RenderElement venue={selectedVenue} /> : <LoadingText />}</ScrollView>
      </FadeInView>
    </View>
  );
};

export default RoomDetailScreen;
