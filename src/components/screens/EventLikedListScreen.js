import { useEffect, useRef } from 'react';
import { View, FlatList, Text } from 'react-native';
import ViewShot from 'react-native-view-shot';
import LoadingText from '../ui/LoadingText';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../redux/eventsThunk';
import EventComponent from '../ui/EventComponent';
import { navigate } from '../../core/RootNavigation';

const EventLikedListScreen = ({ router }) => {
  const dispatch = useDispatch();
  const loading = !useSelector((state) => state.events.isLoaded);
  const events = useSelector((state) => state.events.data);
  const likedEvents = useSelector((state) => state.favorites.likedEvents);
  const viewShotRef = useRef();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  let openShareDialogAsync = async () => {
    if (likedEvents && likedEvents.length > 0) {
      navigate('Capture', {
        children: (
          <View style={{ margin: 20 }}>
            <View
              style={{
                padding: 10,
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: 'white',
              }}
            >
              {events
                .filter((event) => likedEvents.includes(event.id))
                .map((event) => (
                  <View key={event.id} style={{ marginBottom: 20 }}>
                    <Text style={[StylesMain.textBold, { fontSize: 22 }]}>{event.name}</Text>
                    <Text style={StylesMain.textBold}>{event.day_item.date_start}</Text>
                  </View>
                ))}
            </View>
            <Text style={StylesMain.tag}>#poolbar22</Text>
          </View>
        ),
      });
    }
  };

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          title="merkliste"
          next={() => {
            openShareDialogAsync();
          }}
          nextTitle="teilen"
        />
        <ViewShot ref={viewShotRef} style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
          <View style={{ flex: 1, margin: 0 }}>
            {loading && (
              <View style={{ flex: 1, margin: 0 }}>
                <LoadingText />
              </View>
            )}
            {events ? <FlatList style={{ flex: 1 }} data={events.filter((event) => likedEvents.includes(event.id))} renderItem={EventComponent} keyExtractor={(item) => item.id} /> : <LoadingText />}
          </View>
        </ViewShot>
      </FadeInView>
    </View>
  );
};

export default EventLikedListScreen;
