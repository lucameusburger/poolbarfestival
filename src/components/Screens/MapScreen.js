import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text,Button, View, ScrollView, FlatList, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVenues } from '../../redux/artistsThunk';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { navigate } from '../../core/RootNavigation';

import {
    moveToRadius,
    getZoomLevel,
    setBoundingAustria,
} from '../../core/mapHelpers';


import { FontAwesome } from '@expo/vector-icons';


import MapView, {Marker , Callout} from 'react-native-maps';
import MyCalloutView from '../ui/MyCalloutView';
/***
import MapboxGL from "@rnmapbox/maps";
MapboxGL.setAccessToken("<YOUR_ACCESSTOKEN>");
*/

import mapImage from '../../../assets/img/map.png'


const BASE_URL = 'https://www.admin.poolbar.at/';


const MapScreen = ({ navigation }) => {



  const dispatch = useDispatch();

  const artists = useSelector((state) => state.artists.artists);
  const isLoaded = useSelector((state) => state.artists.isLoaded);
  const isFetchingData = useSelector((state) => state.artists.isFetchingData);
  const hasFetchingDataError = useSelector((state) => state.artists.hasFetchingDataError);

    const markers = artists.map((artist) =>
        <Text>{artist.name}</Text>
    );

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="map" />
        <MapView style={styles.map} provider = { MapView.PROVIDER_GOOGLE } customMapStyle = { generatedMapStyle }
        initialRegion={{
          latitude: loewensaal.latitude,
          longitude: loewensaal.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,

      }}>
          
          <Marker coordinate={loewensaal} image={require('../../../assets/img/marker.png')}>
            <Callout>
                <MyCalloutView></MyCalloutView>
                <Text>{artists[0].name}</Text>
                
            </Callout>
        </Marker>
 

        </MapView>
      </FadeInView>
    </View>


  );
};

 function openGoogleMaps(location,name) {
    const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q='
    });
    const latLng = `${location.latitude},${location.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
        ios: `${scheme}${name}@${latLng}`,
        android: `${scheme}${latLng}(${name})`
    });

    Linking.openURL(url);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '82%',
  },
});

const generatedMapStyle = [
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {color: "#2ECDA7"
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#ffffff"
          },
          {
              "saturation": -100
          },
          {
              "lightness": 100
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {
              "hue": "#000000"
          },
          {
              "saturation": -100
          },
          {
              "lightness": -100
          },
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "hue": "#ffffff"
          },
          {
              "saturation": -100
          },
          {
              "lightness": 100
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#ffffff"
          },
          {
              "saturation": -100
          },
          {
              "lightness": 100
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#ffffff"
          },
          {
              "saturation": 0
          },
          {
              "lightness": 100
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
          {
              "hue": "#000000"
          },
          {
              "saturation": 0
          },
          {
              "lightness": -100
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "labels",
      "stylers": [
          {
              "hue": "#ffffff"
          },
          {
              "saturation": 0
          },
          {
              "lightness": 100
          },
          {
              "visibility": "off"
          }
      ]
  }
];

const loewensaal = {
  latitude: 47.36321774000127,
  longitude: 9.689607548263336,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default MapScreen;
