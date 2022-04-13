import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchArtists } from '../../redux/artistsThunk';
import { navigate } from '../../core/RootNavigation';

import { FontAwesome } from '@expo/vector-icons';

import MapView, { Marker } from 'react-native-maps';

/***
import MapboxGL from "@rnmapbox/maps";
MapboxGL.setAccessToken("<YOUR_ACCESSTOKEN>");
*/

import mapImage from '../../../assets/img/map.png';

const BASE_URL = 'https://www.admin.poolbar.at/';

const MapScreen = ({ navigation }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="map" />
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={generatedMapStyle}
          initialRegion={{
            latitude: loewensaal.latitude,
            longitude: loewensaal.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
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
      { color: '#2ECDA7' },
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
