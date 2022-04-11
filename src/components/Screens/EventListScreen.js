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

const EventListScreen = ({ router, navigation }) => {
  const dispatch = useDispatch();
  const loading = !useSelector((state) => state.events.isLoaded);
  const events = useSelector((state) => state.events.data);
  const likedEvents = useSelector((state) => state.favorites.likedEvents);
  const artists = useSelector((state) => state.artists.artists);

  const fetchEvents1 = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/events');
    const data = await resp.json();
    let fetchedEvents = data.data;

    // fetch day
    await Promise.all(
      fetchedEvents.map(async (item) => {
        item.day_item = {};
        if (!item.day) return item;
        const resp = await fetch('https://www.admin.poolbar.at/items/days/' + item.day);
        const data = await resp.json();
        if (!data.data) return item;
        item.day_item = data.data;

        return item;
      })
    );

    // fetch artist
    await Promise.all(
      fetchedEvents.map(async (item) => {
        item.artist_item = {};
        if (!item.artist) return item;
        const resp = await fetch('https://www.admin.poolbar.at/items/artists/' + item.artist);
        const data = await resp.json();
        if (!data.data) return item;
        item.artist_item = data.data;

        return item;
      })
    );

    // load local storage
    const localEvents = await getEvents();
    console.log(localEvents);
    if (localEvents && 1 == 2) {
      await Promise.all(
        fetchedEvents.map(async (item) => {
          if (localEvents.find((x) => x.id === item.id).liked) {
            item.liked = true;
          } else {
            item.liked = false;
          }

          return item;
        })
      );
    }

    fetchedEvents.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.day_item.date_start) - new Date(a.day_item.date_start);
    });

    setEvents(fetchedEvents);
    setLoading(false);
  };

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
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          title="events"
          navigation={navigation}
          next={() => {
            console.log('clc');
            navigation.navigate('LikedEvents');
          }}
          nextTitle="meine events"
        />
        <View style={{ flex: 1, margin: 0 }}>
          {loading && (
            <View style={{ flex: 1, margin: 0 }}>
              <LoadingText />
            </View>
          )}
          {events && <FlatList style={{ flex: 1, padding: 20 }} data={events} renderItem={RenderElement} keyExtractor={(item) => item.id} />}
        </View>

        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default EventListScreen;
