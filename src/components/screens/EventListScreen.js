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

  const flatlistRef = useRef();

  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [initialScrollFinished, setInitialScrollFinished] = useState(false);

  const [blinkLike, setBlinkLike] = useState(false);
  const [blinkLightInterval, setBlinkLightInterval] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  useEffect(() => {
    setDisplayedEvents(events.filter((event) => event.name.toLowerCase().includes(searchText.toLowerCase())));
  }, [events, searchText]);

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

  const scrollToIndex = (index = 0) => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({ animated: true, index: index });
    }
  };

  useEffect(() => {
    var today = new Date();
    var tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (events && displayedEvents && !initialScrollFinished) {
      setInitialScrollFinished(true);
      const scrollTimer = setTimeout(() => {
        let closestEventIndex = 0;
        events.some((event, index) => {
          const eventDate = new Date(event.day_item.date_start);
          if (isToday(eventDate)) {
            closestEventIndex = index;
            return true;
          } else if (eventDate >= tomorrow) {
            closestEventIndex = index;
            return true;
          }
        });
        console.log(closestEventIndex);
        if (closestEventIndex > 0) {
          scrollToIndex(closestEventIndex);
        }
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
          {displayedEvents && displayedEvents.length > 0 ? (
            <FlatList
              onMomentumScrollBegin={() => {
                Keyboard.dismiss();
              }}
              style={{ flex: 1, padding: 0 }}
              data={displayedEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <EventComponent item={item} onLike={onLike} />}
              ref={flatlistRef}
              onScrollToIndexFailed={() => {
                console.log('failed');
                setTimeout(() => {
                  setInitialScrollFinished(false);
                }, 100);
              }}
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
