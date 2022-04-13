import { View, StyleSheet } from 'react-native';

import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';

import MapView, { Marker } from 'react-native-maps';


const BASE_URL = 'https://www.admin.poolbar.at/';

const MapScreen = ({ navigation }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="map" />
        <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} customMapStyle={generatedMapStyle}
          initialRegion={{
            latitude: loewensaal.latitude,
            longitude: loewensaal.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          <Marker coordinate={loewensaal} image={require('../../../assets/img/marker.png')} />
        </MapView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
});

const generatedMapStyle = [
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      { color: '#c6c300' },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        hue: '#ffffff',
      },
      {
        saturation: -100,
      },
      {
        lightness: 100,
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        hue: '#000000',
      },
      {
        saturation: -100,
      },
      {
        lightness: -100,
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        hue: '#ffffff',
      },
      {
        saturation: -100,
      },
      {
        lightness: 100,
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        hue: '#ffffff',
      },
      {
        saturation: -100,
      },
      {
        lightness: 100,
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [
      {
        hue: '#ffffff',
      },
      {
        saturation: 0,
      },
      {
        lightness: 100,
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        hue: '#000000',
      },
      {
        saturation: 0,
      },
      {
        lightness: -100,
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [
      {
        hue: '#ffffff',
      },
      {
        saturation: 0,
      },
      {
        lightness: 100,
      },
      {
        visibility: 'off',
      },
    ],
  },
];

const loewensaal = {
  latitude: 47.36321774000127,
  longitude: 9.689607548263336,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default MapScreen;
