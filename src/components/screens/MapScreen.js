import React, { useState, useEffect } from 'react';
import { NativeModules, Platform, SafeAreaView, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';

import { fetchSpaceLocations } from '../../redux/spaceLocationThunk';
import LocationInfoBottomBar from '../ui/mapUi/LocationInfoBottomBar';
import CustomMarker from '../ui/mapUi/CustomMarker';
import CustomMap from '../ui/mapUi/CustomMap';

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
  typeof APPROX_STATUSBAR_HEIGHT.statusBarHeight === 'number'
    ? View
    : SafeAreaView;

const RenderMarkers = ({ setInfoBarVisible, infoBarVisible }) => {
  const dispatch = useDispatch();

  const currentLocation = useSelector((state) => state.currentLocation.data);

  const spaceLocations = useSelector((state) => state.spaceLocations.data);

  const poiLocations = useSelector((state) => state.poi.data);

  const setCurrentLocation = (newLocation) => {
    dispatch({
      type: 'SET_CURRENTLOCATION',
      payload: newLocation,
    });
  };

  return (
    <>
      {spaceLocations.map((location) => (
        <CustomMarker
          location={location}
          onPress={() => {
            setInfoBarVisible(true);
            setCurrentLocation(location);
          }}
          markerIcon={'map-pin'}
          iconColor={
            currentLocation?.id === location.id && infoBarVisible
              ? '#00ff00'
              : 'black'
          }
          key={'marker_' + location.id}
        />
      ))}
      {poiLocations.map((location) => (
        <CustomMarker
          location={location}
          onPress={() => {
            setInfoBarVisible(true);
            setCurrentLocation(location);
          }}
          markerIcon={'map-marker-alt'}
          iconColor={
            currentLocation?.id === location.id && infoBarVisible
              ? '#00ff00'
              : 'black'
          }
          key={'marker_' + location.id}
        />
      ))}
    </>
  );
};

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mapRef = React.createRef();

  const [infoBarVisible, setInfoBarVisible] = useState(false);

  const currentLocation = useSelector((state) => state.currentLocation.data);

  function setBoundingAustria() {
    mapRef.current.setMapBoundaries(bboxAustria[0], bboxAustria[1]);
  }

  useEffect(() => {
    dispatch(fetchSpaceLocations());
  }, []);

  return (
    <Wrapper style={[StylesMain.mainView, { position: 'absolute' }]}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="map" />
        <CustomMap
          onPress={(event) => {
            if (event.nativeEvent.action === 'marker-press') {
              return;
            }
            setInfoBarVisible(false);
          }}
          onMapReady={setBoundingAustria}
          mapRef={mapRef}
          initialRegion={initialRegion}
        >
          <RenderMarkers
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
