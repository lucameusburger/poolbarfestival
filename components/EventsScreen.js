import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from '../modules/AppButton';
import LoadingText from '../modules/LoadingText';
import NavBar from '../modules/NavBar';
import FadeInView from '../modules/FadeInView';
import StylesMain from '../styles/StylesMain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/eventsThunk';


const EventsScreen = ({ router, navigation }) => {
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
    if (localEvents) {
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

    setEvents(fetchedEvents);
    setLoading(false);
  };

  const likeEvent = (id) => {
    dispatch({
      type: 'ADD_TO_LIKED_EVENTS',
      payload: id
    })
  };

  const unLikeEvent = (id) => {
    dispatch({
      type: 'REMOVE_FROM_LIKED_EVENTS',
      payload: id
    })
  };

  const RenderElement = ({ item }) => {
    const artist = artists.find((x) => x.id === item.artist);
    console.log(item.artist, " : ", artist);
    const img = artist?.image ? { uri: 'https://admin.poolbar.at/assets/' + artist.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(item?.day_item?.date_start);
    const dateString = date.toLocaleDateString('de-DE', dateOptions);

    const isLiked = likedEvents.includes(item.id);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Event', {
            id: item.id,
          })
        }
      >
        <View key={item.id} style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={{ width: '100%', marginTop: 'auto' }}>
            <FontAwesome
              style={{ alignSelf: 'flex-end', marginRight: 10, marginBottom: 10 }}
              name={
                isLiked ?
                  'heart' :
                  'heart-o'
              }
              size={32}
              color="#2ECDA7"
              onPress={() => {
                if (isLiked) {
                  unLikeEvent(item.id);
                } else {
                  likeEvent(item.id);
                }
              }}
            />
            <Text style={StylesMain.labelMain}>{item.name || artist?.name}</Text>
            <Text style={StylesMain.labelText}>{dateString}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  console.log(events)
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="events" navigation={navigation} />
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>
          {loading && <LoadingText />}
          {events && <FlatList style={{ flex: 1 }} data={events} renderItem={RenderElement} keyExtractor={(item) => item.id} />}
        </View>

        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default EventsScreen;
