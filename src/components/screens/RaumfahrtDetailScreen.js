import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AppButton from "../ui/AppButton";
import NavBar from "../ui/NavBar";
import LoadingText from "../ui/LoadingText";
import FadeInView from "../ui/FadeInView";
import StylesMain from "../../../styles/StylesMain";
import { fetchPOI } from "../../redux/poiThunk";

function openGoogleMaps(location, name) {
  const scheme = Platform.select({
    ios: "maps:0,0?q=",
    android: "geo:0,0?q=",
  });
  const latLng = `${location.latitude},${location.longitude}`;
  const url = Platform.select({
    ios: `${scheme}${name}@${latLng}`,
    android: `${scheme}${latLng}(${name})`,
  });

  Linking.openURL(url);
}

const RaumfahrtDetail = ({ spaceLocation }) => {
  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <View style={{ padding: 10, marginTop: 10 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={StylesMain.artistDetailsDateText}>
            {spaceLocation.year}
          </Text>

          <Text style={StylesMain.artistDetailsMainText}>
            {spaceLocation.name}
          </Text>
          <Text style={StylesMain.description}>
            {spaceLocation.description}
          </Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <AppButton
          title="navigieren"
          style={{
            marginRight: "auto",
            marginLeft: 0,
            marginBottom: 10,
          }}
          textProps={{
            numberOfLines: 1,
          }}
          onPress={() => {
            openGoogleMaps(
              {
                latitude: spaceLocation.location.coordinates[1],
                longitude: spaceLocation.location.coordinates[0],
              },
              spaceLocation.name
            );
          }}
        />
      </View>
    </View>
  );
};

const RaumfahrtDetailScreen = ({ route }) => {
  const id = route.params.id.trim();
  const dispatch = useDispatch();

  const isLoaded = useSelector((state) => state.spaceLocations.isLoaded);
  const spaceLocations = useSelector((state) => state.spaceLocations.data);
  const [selectedSpaceLocation, setSelectedSpaceLocation] = useState(null);

  useEffect(() => {
    dispatch(fetchPOI(id));
  }, []);

  useEffect(() => {
    setSelectedSpaceLocation(
      spaceLocations.find((spaceLocation) => spaceLocation.id === id)
    );
  }, [spaceLocations]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: "100%", height: "100%" }}>
        <NavBar title="raumfahrt" />
        <ScrollView style={{ flex: 1, marginTop: 10, padding: 10 }}>
          {!isLoaded || !selectedSpaceLocation ? (
            <LoadingText />
          ) : (
            <RaumfahrtDetail spaceLocation={selectedSpaceLocation} />
          )}
        </ScrollView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 300,
  },
  creditsDateText: {
    fontFamily: "HelviotopiaBold",
    color: "black",
    alignSelf: "flex-start",
    marginTop: "auto",
    fontSize: 20,
    textAlign: "left",
    textTransform: "uppercase",
  },
  creditsMainText: {
    fontFamily: "Helviotopia",
    color: "black",
    alignSelf: "flex-start",
    marginTop: "auto",
    fontSize: 42,
    textAlign: "left",
    textTransform: "uppercase",
  },
});

export default RaumfahrtDetailScreen;
