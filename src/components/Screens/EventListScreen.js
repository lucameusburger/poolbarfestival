import { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import LoadingText from '../ui/LoadingText';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../redux/eventsThunk';
import EventComponent from '../ui/EventComponent';
import { navigate } from '../../core/RootNavigation';

const EventListScreen = ({ router }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.data);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          title="events"
          next={() => {
            navigate('LikedEvents');
          }}
          nextTitle="meine events"
        />
        <View style={{ flex: 1, margin: 0 }}>
          {events ?
            <FlatList
              style={{ flex: 1, padding: 0 }}
              data={events}
              renderItem={EventComponent}
              keyExtractor={(item) => item.id}
            /> :
            <LoadingText />
          }
        </View>
      </FadeInView>
    </View>
  );
};

export default EventListScreen;
