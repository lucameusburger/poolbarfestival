import { useEffect, useRef } from 'react';
import { View, FlatList, PermissionsAndroid, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import LoadingText from '../ui/LoadingText';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../redux/eventsThunk';
import EventComponent from '../ui/EventComponent';

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
    viewShotRef.current.capture({ format: 'jpg', quality: 80 }).then(async (uri) => {
      await Sharing.shareAsync('file://' + uri);
    });
  };

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          title="meine events"
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
