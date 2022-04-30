import React, { useState, useEffect } from "react";
import { NativeModules, Platform, SafeAreaView, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import NavBar from "../ui/NavBar";
import FadeInView from "../ui/FadeInView";
import StylesMain from "../../../styles/StylesMain";

import geodata from "../../../assets/geodata.json";

import { fetchSpaceLocations } from "../../redux/spaceLocationThunk";
import CustomPolygon from "../ui/mapUi/CustomPolygon";
import LocationInfoBottomBar from "../ui/mapUi/LocationInfoBottomBar";
import CustomMarker from "../ui/mapUi/CustomMarker";
import CustomMap from "../ui/mapUi/CustomMap";

const initialRegion = {
  latitude: 47.36321774000127,
  longitude: 9.689607548263336,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

const bboxAustria = [
  {
    latitude: 48.356363,
    longitude: 9.150603,
  },
  {
    latitude: 46.460683,
    longitude: 12.109966,
  },
];

const estimatedStatusBarHeight =
  NativeModules.NativeUnimoduleProxy?.modulesConstants?.ExponentConstants
    ?.statusBarHeight ?? 0;

const APPROX_STATUSBAR_HEIGHT = Platform.select({
  android: estimatedStatusBarHeight,
  ios: Platform.Version < 11 ? estimatedStatusBarHeight : 0,
});

const Wrapper =
  typeof APPROX_STATUSBAR_HEIGHT.statusBarHeight === "number"
    ? View
    : SafeAreaView;

const RenderMarkers = ({ locations, setInfoBarVisible, infoBarVisible }) => {
  const dispatch = useDispatch();

  const currentLocation = useSelector((state) => state.currentLocation.data);

  const setCurrentLocation = (newLocation) => {
    dispatch({
      type: "SET_CURRENTLOCATION",
      payload: newLocation,
    });
  };

  return locations.map((location) => (
    <CustomMarker
      location={location}
      setCurrentLocation={setCurrentLocation}
      setInfoBarVisible={setInfoBarVisible}
      infoBarVisible={infoBarVisible}
      currentLocation={currentLocation}
      key={"marker_" + location.id}
    />
  ));
};

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mapRef = React.createRef();

  const [infoBarVisible, setInfoBarVisible] = useState(false);

  const currentLocation = useSelector((state) => state.currentLocation.data);
  const locations = useSelector((state) => state.spaceLocations);
  const isLoaded = useSelector((state) => state.spaceLocations.isLoaded);

  function setBoundingAustria() {
    mapRef.current.setMapBoundaries(bboxAustria[0], bboxAustria[1]);
  }

  useEffect(() => {
    dispatch(fetchSpaceLocations());
  }, []);

  return (
    <Wrapper style={[StylesMain.mainView, { position: "absolute" }]}>
      <FadeInView style={{ flex: 1, width: "100%", height: "100%" }}>
        <NavBar navigation={navigation} title="map" />
        <CustomMap
          onPress={(event) => {
            if (event.nativeEvent.action === "marker-press") {
              return;
            }
            setInfoBarVisible(false);
          }}
          onMapReady={setBoundingAustria}
          mapRef={mapRef}
          initialRegion={initialRegion}
        >
          {isLoaded && locations && (
            <CustomPolygon
              coordinates={geodata}
              strokeWidth={5}
              strokeColor="black"
              fillColor="rgba(0,0,0,0.135)"
            />
          )}
          <RenderMarkers
            locations={isLoaded && locations ? locations.data : []}
            infoBarVisible={infoBarVisible}
            setInfoBarVisible={setInfoBarVisible}
          />
        </CustomMap>

        {infoBarVisible && <LocationInfoBottomBar location={currentLocation} />}
      </FadeInView>
    </Wrapper>
  );
};

export default MapScreen;
