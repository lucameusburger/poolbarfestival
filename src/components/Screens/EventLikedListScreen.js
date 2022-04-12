import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, TouchableOpacity, PermissionsAndroid, Alert, Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from '../ui/AppButton';
import LoadingText from '../ui/LoadingText';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../redux/eventsThunk';
import { addCallenderEvent, deleteCallenderEvent } from '../../redux/callenderThunk';

const EventLikedListScreen = ({ router, navigation }) => {
  const dispatch = useDispatch();
  const loading = !useSelector((state) => state.events.isLoaded);
  const events = useSelector((state) => state.events.data);
  const likedEvents = useSelector((state) => state.favorites.likedEvents);
  const artists = useSelector((state) => state.artists.artists);
  const viewShotRef = useRef();

  let [selectedImage, setSelectedImage] = React.useState(null);

  const likeEvent = (event) => {
    dispatch({
      type: 'ADD_TO_LIKED_EVENTS',
      payload: event.id,
    });
    dispatch(addCallenderEvent(event.id));
  };

  const unLikeEvent = (event) => {
    dispatch({
      type: 'REMOVE_FROM_LIKED_EVENTS',
      payload: event.id,
    });
    dispatch(deleteCallenderEvent(event.id));
  };

  const RenderElement = ({ item }) => {
    const artist = artists.find((x) => x.id === item.artist);
    const img = artist?.image ? { uri: 'https://admin.poolbar.at/assets/' + artist.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

    let dateString = 'tba';
    if (item.day_item && item.day_item.date_start) {
      let dateOptions = { day: 'numeric', month: 'long' };
      let date = new Date(item.day_item.date_start);
      dateString = date.toLocaleDateString('en-US', dateOptions);
    }

    const isLiked = likedEvents.includes(item.id);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Event', {
            id: item.id,
          })
        }
      >
        <View key={item.id} style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
          <View style={{ width: '100%', marginTop: 'auto', flexDirection: 'row' }}>
            <View style={{ width: '80%' }}>
              <Text style={StylesMain.eventDateText}>{dateString}</Text>
              <Text style={StylesMain.eventMainText}>{item.name || item.artist_item.name}</Text>
            </View>
            <View style={{ width: '20%' }}>
              <TouchableOpacity
                style={{ height: '100%' }}
                onPress={() => {
                  if (isLiked) {
                    unLikeEvent(item);
                  } else {
                    likeEvent(item);
                  }
                }}
              >
                <FontAwesome style={{ alignSelf: 'flex-end', marginBottom: 'auto', marginTop: 'auto' }} name={isLiked ? 'heart' : 'heart-o'} size={32} color="#c6c300" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(fetchEvents());
    //getCallenders();
    //createCalendar();
    //createEvent(9)
  }, []);

  //IMAGE
  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: 'Image Download Permission',
        message: 'Your permission is required to save images to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert('', 'Your permission is required to save images to your device', [{ text: 'OK', onPress: () => {} }], { cancelable: false });
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  let openShareDialogAsync = async () => {
    //await setSelectedImage(exportComponentAsPNG(componentRef));dd
    viewShotRef.current.capture({ format: 'jpg', quality: 80 }).then(async (uri) => {
      console.log('do something with ', uri);
      setSelectedImage(uri);
      await Sharing.shareAsync('file://' + uri);
    });
  };

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          title="meine events"
          navigation={navigation}
          next={() => {
            openShareDialogAsync();
          }}
          nextTitle="teilen"
        />
        <ViewShot ref={viewShotRef} style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>
          <View style={{ flex: 1, margin: 0 }} ref={viewShotRef}>
            {loading && (
              <View style={{ flex: 1, margin: 0 }}>
                <LoadingText />
              </View>
            )}
            {events && <FlatList style={{ flex: 1, padding: 20 }} data={events.filter((event) => likedEvents.includes(event.id))} renderItem={RenderElement} keyExtractor={(item) => item.id} />}
          </View>
        </ViewShot>

        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default EventLikedListScreen;
