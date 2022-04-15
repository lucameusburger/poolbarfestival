import React, { useState, useEffect, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Linking, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { navigate } from '../../core/RootNavigation';


import geodata from '../../../assets/geodata.json';

import { FontAwesome } from '@expo/vector-icons';


import MapView, { Marker, Callout, Polygon } from 'react-native-maps';
import MyCalloutView from '../ui/MyCalloutView';


import mapImage from '../../../assets/img/map.png'
import { fetchSpaceLocations } from '../../redux/spaceLocationThunk';
import markerImage from '../../../assets/img/marker.png';

const BASE_URL = 'https://www.admin.poolbar.at/';
const mapRef = React.createRef();

function CustomMarker({ location, setCurrentLocation }) {
    return (
        <Marker
            key={location.id}
            image={markerImage}
            coordinate={{ 'longitude': location.location.coordinates[0], 'latitude': location.location.coordinates[1] }}
            onPress={() =>
                setCurrentLocation({ 'longitude': location.location.coordinates[0], 'latitude': location.location.coordinates[1] })
            }
        >
            <Callout
                tooltip={true}
                style={{ backgroundColor: 'transparent' }}
                onPress={
                    () => {
                        openGoogleMaps({
                            'latitude': location.location.coordinates[1],
                            'longitude': location.location.coordinates[0]
                        },
                            location.name
                        )
                        console.log('bruh')
                    }}>
                <MyCalloutView location={{ 'latitude': location.location.coordinates[1], 'longitude': location.location.coordinates[0] }} name={location.name}></MyCalloutView>


            </Callout>
        </Marker>
    )
}

const getMarkers = (locations) => {

    const dispatch = useDispatch();

    const currentLocation = useSelector(state => state.currentLocation);

    const setCurrentLocation = (newLocation) => {
        dispatch({
            type: "SET_CURRENTLOCATION",
            payload: newLocation
        })
    }

    return locations.data.map((location) =>
        <CustomMarker
            location={location}
            setCurrentLocation={setCurrentLocation}
        />
    );
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

function setBoundingBox(bbox) {
    console.log('setting box');
    mapRef.current.setMapBoundaries(bbox[0], bbox[1]);
}

const MapScreen = ({ navigation }) => {



    const dispatch = useDispatch();

    const currentLocation = useSelector(state => state.currentLocation);


    const locations = useSelector((state) => state.spaceLocations);
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
                    style={styles.map}
                    provider={MapView.PROVIDER_GOOGLE}
                    customMapStyle={generatedMapStyle}

                    onMapReady={setBoundingAustria}
                    ref={mapRef}
                    initialRegion={initial}>
                    <Polygon
                        coordinates={geodata}
                        strokeWidth={5}
                        strokeColor='black'
                        fillColor='#00000022'
                    />
                    {(isLoaded && locations) ?
                        getMarkers(locations) :
                        null
                    }
                </MapView>
                <View style={{
                    position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%', height: '10%', zIndex: 10
                    , display: 'flex', flexDirection: 'row'
                }}>
                    <Text>Titel</Text>
                    <Text>Beschreibung</Text>
                    <TouchableOpacity style={{}} onPress={() => openGoogleMaps(currentLocation)}>
                        <FontAwesome style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', opacity: 0.6 }} name={'map'} size={36} color="#000" />
                    </TouchableOpacity>
                </View>
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
            {
                color: "#666666"
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
                "visibility": "off"
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

const initial = {
    latitude: 47.36321774000127,
    longitude: 9.689607548263336,
    latitudeDelta: 1,
    longitudeDelta: 1,
};

export default MapScreen;
