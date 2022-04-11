import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
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

const EventLikedListScreen = ({ router, navigation }) => {
  const dispatch = useDispatch();
  const loading = !useSelector((state) => state.events.isLoaded);
  const events = useSelector((state) => state.events.data);
  const likedEvents = useSelector((state) => state.favorites.likedEvents);
  const artists = useSelector((state) => state.artists.artists);

  const likeEvent = (id) => {
    dispatch({
      type: 'ADD_TO_LIKED_EVENTS',
      payload: id,
    });
  };

  const unLikeEvent = (id) => {
    dispatch({
      type: 'REMOVE_FROM_LIKED_EVENTS',
      payload: id,
    });
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
                    unLikeEvent(item.id);
                  } else {
                    likeEvent(item.id);
                  }
                }}
              >
                <FontAwesome style={{ alignSelf: 'flex-end', marginBottom: 'auto', marginTop: 'auto' }} name={isLiked ? 'heart' : 'heart-o'} size={32} color="#2ECDA7" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="meine events" navigation={navigation} />
        <View style={{ flex: 1, margin: 20 }}>
          {loading && <LoadingText />}
          {events && <FlatList style={{ flex: 1 }} data={events} renderItem={RenderElement} keyExtractor={(item) => item.id} />}
        </View>

        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default EventLikedListScreen;
