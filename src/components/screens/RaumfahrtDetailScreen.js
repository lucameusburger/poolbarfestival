import { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchPOI } from '../../redux/poiThunk';
import { fetchSpaceLocations } from '../../redux/spaceLocationThunk';

function openGoogleMaps(location, name) {
  const scheme = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
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
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ padding: 10, borderBottomWidth: 2 }}>
        <Text style={StylesMain.detailsMainText}>{spaceLocation.name}</Text>
      </View>
      <View style={{ padding: 10, borderBottomWidth: 2 }}>
        <Text style={StylesMain.detailsDateText}>{spaceLocation.year}</Text>
      </View>
      {spaceLocation.description && (
        <View style={{ padding: 10 }}>
          <View>
            <Text style={StylesMain.text}>{spaceLocation.description}</Text>
          </View>
        </View>
      )}
      <View style={{ padding: 10 }}>
        <AppButton
          title="navigieren"
          style={{
            marginRight: 'auto',
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

  const spaceLocations = useSelector((state) => state.spaceLocations.data);
  const [selectedSpaceLocation, setSelectedSpaceLocation] = useState(null);

  useEffect(() => {
    dispatch(fetchSpaceLocations());
  }, []);

  useEffect(() => {
    setSelectedSpaceLocation(
      spaceLocations.find((spaceLocation) => spaceLocation.id === id)
    );
  }, [spaceLocations]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="raumfahrt" />
        <ScrollView style={{ flex: 1 }}>
          {selectedSpaceLocation ? (
            <RaumfahrtDetail spaceLocation={selectedSpaceLocation} />
          ) : (
            <LoadingText />
          )}
        </ScrollView>
      </FadeInView>
    </View>
  );
};

export default RaumfahrtDetailScreen;
