import { useEffect, useRef, useState } from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import LoadingText from '../ui/LoadingText';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../redux/eventsThunk';
import EventComponent from '../ui/EventComponent';
import { navigate } from '../../core/RootNavigation';
import { CLR_PRIMARY } from '../../core/Theme';
import { isToday } from '../../core/helpers';

const EventListScreen = ({ router }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.data);
  const isLoaded = useSelector((state) => state.events.isLoaded);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  useEffect(() => {
    setDisplayedEvents(
      events.filter((s) =>
        s.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [events, searchText]);

  const [blinkLike, setBlinkLike] = useState(false);
  const [blinkLightInterval, setBlinkLightInterval] = useState(null);
  const blinkDuration = 300;
  const onLike = () => {
    setBlinkLike(true);
    clearInterval(blinkLightInterval);
    setBlinkLightInterval(
      setInterval(() => {
        setBlinkLike(false);
      }, blinkDuration)
    );
  };

  const flatlistRef = useRef();

  const scrollToIndex = (index = 0) => {
    flatlistRef.current.scrollToIndex({ animated: true, index: index });
  };

  const [initialScrollFinished, setInitialScrollFinished] = useState(false);

  useEffect(() => {
    if (events && displayedEvents && !initialScrollFinished) {
      setInitialScrollFinished(true);
      const scrollTimer = setTimeout(() => {
        let todayIndex = 0;
        events.some((event, index) => {
          if (isToday(event.day_item.date_start)) {
            todayIndex = index;
            return true;
          }
        });
        scrollToIndex(todayIndex);
      }, 400);
    }
  }, [events, displayedEvents, initialScrollFinished]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          title="events"
          next={() => {
            navigate('LikedEvents');
          }}
          nextTitle="merkliste"
          nextButtonStyle={blinkLike ? { backgroundColor: CLR_PRIMARY } : null}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <View style={{ flex: 1, margin: 0 }}>
          {events && displayedEvents ? (
            <FlatList
              onMomentumScrollBegin={() => {
                Keyboard.dismiss();
              }}
              style={{ flex: 1, padding: 0 }}
              data={displayedEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <EventComponent item={item} onLike={onLike} />
              )}
              ref={flatlistRef}
            />
          ) : (
            <LoadingText />
          )}
        </View>
      </FadeInView>
    </View>
  );
};

export default EventListScreen;
