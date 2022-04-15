import React, { useState, useEffect, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Linking, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';


import geodata from '../../../assets/geodata.json';


import MapView, { Marker, Callout, Polygon } from 'react-native-maps';
import MyCalloutView from '../ui/MyCalloutView';


import { fetchSpaceLocations } from '../../redux/spaceLocationThunk';
import markerImage from '../../../assets/img/marker.png';
import selectedMarkerImage from '../../../assets/img/selectedMarker.png';

const BASE_URL = 'https://www.admin.poolbar.at/';
const mapRef = React.createRef();




function CustomMarker({ location, setCurrentLocation, currentLocation, infoBarVisible, setInfoBarVisible }) {
    return (
        <Marker
            key={location.id}
            image={(currentLocation?.id === location.id && infoBarVisible) ? selectedMarkerImage : markerImage}
            coordinate={{ 'longitude': location.location.coordinates[0], 'latitude': location.location.coordinates[1] }}
            tracksViewChanges={true}
            onPress={() => {
                setInfoBarVisible(true)
                console.log('infobar visible is now ', infoBarVisible)
                setCurrentLocation(location);
            }
            }
        >

        </Marker>
    )
}


const InfoBar = () => {
    const dispatch = useDispatch();

    const currentLocation = useSelector(state => state.currentLocation.data);

    if (currentLocation) {
        return <Text style={{ height: 200, width: 200 }}>yow</Text>
    }
}

const RenderMarkers = ({ locations, setInfoBarVisible, infoBarVisible }) => {

    const dispatch = useDispatch();

    const currentLocation = useSelector(state => state.currentLocation.data);

    const setCurrentLocation = (newLocation) => {
        dispatch({
            type: "SET_CURRENTLOCATION",
            payload: newLocation
        })
    }
    //console.log('lm: ', locations)
    return locations.map((location) =>
        <CustomMarker
            location={location}
            setCurrentLocation={setCurrentLocation}
            setInfoBarVisible={setInfoBarVisible}
            infoBarVisible={infoBarVisible}
            currentLocation={currentLocation}
            key={'marker_' + location.id}
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

    const [infoBarVisible, setInfoBarVisible] = useState(false);

    const dispatch = useDispatch();

    const currentLocation = useSelector(state => state.currentLocation.data);


    const setCurrentLocation = (newLocation) => {
        dispatch({
            type: "SET_CURRENTLOCATION",
            payload: newLocation
        })
    }

    const locations = useSelector((state) => state.spaceLocations);
    const isLoaded = useSelector((state) => state.spaceLocations.isLoaded);
    const isFetchingData = useSelector((state) => state.spaceLocations.isFetchingData);
    const hasFetchingDataError = useSelector((state) => state.spaceLocations.hasFetchingDataError);

    useEffect(() => {
        dispatch(fetchSpaceLocations());
    }, []);

    console.log('cl: ', currentLocation)

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
                    onPress={(event) => {
                        if (event.nativeEvent.action === 'marker-press') {
                            return

                        }
                        setInfoBarVisible(false)
                        console.log('kein marker')
                        console.log(infoBarVisible)



                    }}
                    onMapReady={setBoundingAustria}
                    ref={mapRef}
                    initialRegion={initial}>
                    <Polygon
                        coordinates={geodata}
                        strokeWidth={5}
                        strokeColor='black'
                        fillColor='#00000022'
                    />
                    <RenderMarkers
                        locations={
                            (isLoaded && locations) ?
                                locations.data :
                                []
                        }
                        infoBarVisible={infoBarVisible}
                        setInfoBarVisible={setInfoBarVisible}
                    />
                </MapView>


                {infoBarVisible &&
                    <View
                        style={{
                            position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%', height: '15%', zIndex: 10
                            , display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'top', borderWidth: '2px'
                        }}>

                        <View>
                            <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 10 }}>{currentLocation.name}</Text>
                            <Text>{currentLocation.description}</Text>

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                console.log("go to detail screen location")
                            }}>
                                <FontAwesome
                                    style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', opacity: 0.6 }}
                                    name={'info'}
                                    size={36}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                console.log("cl: ", currentLocation)
                                openGoogleMaps({
                                    'latitude': currentLocation.location.coordinates[1],
                                    'longitude': currentLocation.location.coordinates[0]
                                },
                                    currentLocation.name
                                )
                            }}>
                                <FontAwesome
                                    style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', opacity: 0.6 }}
                                    name={'location-arrow'}
                                    size={36}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>


                    </View>
                }



            </FadeInView>
        </View>


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
                "hue": "white"
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
                "hue": "black"
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
                "hue": "white"
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
                "hue": "white"
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
                "hue": "white"
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
                "hue": "black"
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
                "hue": "white"
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
