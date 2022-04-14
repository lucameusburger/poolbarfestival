import React, { useState, useEffect, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Linking } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { navigate } from '../../core/RootNavigation';


import geodata from '../../../assets/geodata.json';

import { FontAwesome } from '@expo/vector-icons';


import MapView, {Marker , Callout, Polygon} from 'react-native-maps';
import MyCalloutView from '../ui/MyCalloutView';


import mapImage from '../../../assets/img/map.png'
import { fetchSpaceLocations } from '../../redux/spaceLocationThunk';


const BASE_URL = 'https://www.admin.poolbar.at/';
const mapRef = React.createRef();

const getMarkers = (locations) => {
    let markers = [];
    let counter = 0;
    locations.data.map((location) => markers[counter++] = <Marker key={location.id}
    image={require('../../../assets/img/marker.png')}
    coordinate={{'longitude':location.location.coordinates[0],'latitude':location.location.coordinates[1]}}
    >
        <Callout tooltip={true} style={{backgroundColor:'transparent'}} onPress={
                            () =>{
                                openGoogleMaps({'latitude':location.location.coordinates[0],'longitude':location.location.coordinates[1]},location.name)
                                console.log('bruh')
                        }}>
                <MyCalloutView location={{'latitude':location.location.coordinates[0],'longitude':location.location.coordinates[1]}} name={location.name}></MyCalloutView>


            </Callout>
    </Marker>);
    return markers;
}

function openGoogleMaps(location, name) {
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
 function setBoundingAustria() {
    const bboxAustria = [
        {
            latitude: 48.356363,
            longitude: 9.150603
        },
        {
            latitude: 46.460683,
            longitude: 12.109966,
        }
    ]
    setBoundingBox(bboxAustria)
}

// set the bounding box of the map to Austria
 function setBoundingBox(bbox) {
     console.log('setting box');
    mapRef.current.setMapBoundaries(bbox[0], bbox[1]);
}

const MapScreen = ({ navigation }) => {



  const dispatch = useDispatch();

  const locations = useSelector((state) => state.spaceLocations);
  console.log(locations);
  const isLoaded = useSelector((state) => state.spaceLocations.isLoaded);
  const isFetchingData = useSelector((state) => state.spaceLocations.isFetchingData);
  const hasFetchingDataError = useSelector((state) => state.spaceLocations.hasFetchingDataError);

  useEffect(() => {
    dispatch(fetchSpaceLocations());
  }, []);


  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="map" />
        <MapView
            minZoomLevel={7}
            maxZoomLevel={15}
            style={styles.map} provider = { MapView.PROVIDER_GOOGLE } customMapStyle = { generatedMapStyle }

            onMapReady={setBoundingAustria}
            ref={mapRef}
            initialRegion={{
            latitude: loewensaal.latitude,
            longitude: loewensaal.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,

      }}>
          <Polygon
            coordinates={geodata}
            strokeWidth={3}
            strokeColor={'green'}
            fillColor="transparent"
        />

        {isLoaded&&locations?getMarkers(locations):[]}


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
    height: '82%',
  },
});

const generatedMapStyle = [
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {color: "#666666"
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
