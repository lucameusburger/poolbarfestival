import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import LoadingText from "../ui/LoadingText";
import NavBar from "../ui/NavBar";
import FadeInView from "../ui/FadeInView";
import StylesMain from "../../../styles/StylesMain";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../redux/eventsThunk";
import EventComponent from "../ui/EventComponent";
import { navigate } from "../../core/RootNavigation";
import { CLR_PRIMARY } from "../../core/Theme";

const EventListScreen = ({ router }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.data);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const [blinkLike, setBlinkLike] = useState(false);
  const [blinkLightInterval, setBlinkLightInterval] = useState(null);
  const blinkDuration = 200;
  const onLike = () => {
    setBlinkLike(true);
    clearInterval(blinkLightInterval);
    setBlinkLightInterval(
      setInterval(() => {
        setBlinkLike(false);
      }, blinkDuration)
    );
  };

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: "100%", height: "100%" }}>
        <NavBar
          title="events"
          next={() => {
            navigate("LikedEvents");
          }}
          nextTitle="merkliste"
          nextButtonStyle={blinkLike ? { backgroundColor: CLR_PRIMARY } : null}
        />
        <View style={{ flex: 1, margin: 0 }}>
          {events ? (
            <FlatList
              style={{ flex: 1, padding: 0 }}
              data={events}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <EventComponent item={item} onLike={onLike} />
              )}
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
