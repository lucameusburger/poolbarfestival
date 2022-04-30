import React, { useState, useEffect, memo } from "react";
import {
  Text,
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import NavBar from "../ui/NavBar";
import FadeInView from "../ui/FadeInView";
import StylesMain from "../../../styles/StylesMain";
import AppButton from "../ui/AppButton";

import geodata from "../../../assets/geodata.json";

import MapView, { Marker, Callout, Polygon } from "react-native-maps";

import { fetchSpaceLocations } from "../../redux/spaceLocationThunk";
import markerImage from "../../../assets/img/marker.png";
import selectedMarkerImage from "../../../assets/img/selectedMarker.png";
import CustomPolygon from "../ui/CustomPolygon";
import { navigate } from "../../core/RootNavigation";
import LocationInfoBottomBar from "../ui/LocationInfoBottomBar";
import mapStyle from "../../../assets/data/mapStyle.json";

const mapRef = React.createRef();

function CustomMarker({
  location,
  setCurrentLocation,
  currentLocation,
  infoBarVisible,
  setInfoBarVisible,
}) {
  return (
    <Marker
      key={location.id}
      image={
        currentLocation?.id === location.id && infoBarVisible
          ? selectedMarkerImage
          : markerImage
      }
      coordinate={{
        longitude: location.location.coordinates[0],
        latitude: location.location.coordinates[1],
      }}
      tracksViewChanges={true}
      onPress={() => {
        setInfoBarVisible(true);
        setCurrentLocation(location);
      }}
    ></Marker>
  );
}

const InfoBar = () => {
  const dispatch = useDispatch();

  const currentLocation = useSelector((state) => state.currentLocation.data);

  if (currentLocation) {
    return <Text style={{ height: 200, width: 200 }}>yow</Text>;
  }
};

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

function setBoundingAustria() {
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
  setBoundingBox(bboxAustria);
}

function setBoundingBox(bbox) {
  mapRef.current.setMapBoundaries(bbox[0], bbox[1]);
}

const MapScreen = ({ navigation }) => {
  const [infoBarVisible, setInfoBarVisible] = useState(false);

  const dispatch = useDispatch();

  const currentLocation = useSelector((state) => state.currentLocation.data);

  const setCurrentLocation = (newLocation) => {
    dispatch({
      type: "SET_CURRENTLOCATION",
      payload: newLocation,
    });
  };

  const locations = useSelector((state) => state.spaceLocations);
  const isLoaded = useSelector((state) => state.spaceLocations.isLoaded);
  const isFetchingData = useSelector(
    (state) => state.spaceLocations.isFetchingData
  );
  const hasFetchingDataError = useSelector(
    (state) => state.spaceLocations.hasFetchingDataError
  );

  useEffect(() => {
    dispatch(fetchSpaceLocations());
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: "100%", height: "100%" }}>
        <NavBar navigation={navigation} title="map" />
        <MapView
          minZoomLevel={7}
          maxZoomLevel={15}
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          onPress={(event) => {
            if (event.nativeEvent.action === "marker-press") {
              return;
            }
            setInfoBarVisible(false);
          }}
          onMapReady={setBoundingAustria}
          ref={mapRef}
          initialRegion={initial}
          showsPointsOfInterest={false}
          showsIndoors={false}
          pitchEnabled={false}
          toolbarEnabled={false}
          showsCompass={false}
          showsScale={false}
          showsMyLocationButton={false}
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
        </MapView>

        {infoBarVisible && <LocationInfoBottomBar location={currentLocation} />}
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

const initial = {
  latitude: 47.36321774000127,
  longitude: 9.689607548263336,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

export default MapScreen;
