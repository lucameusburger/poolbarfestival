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

const EventsScreen = ({ router, navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
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

  const likeItem = (id) => {
    console.log('like');
    // set like on element of events with id
    let newEvents = events.map((item) => {
      if (item.id === id) {
        item.liked = !item.liked;
      }
      return item;
    });
    setEvents(newEvents);
    storeEvents(events);
  };

  const storeEvents = async (events) => {
    try {
      const jsonValue = JSON.stringify(events);
      await AsyncStorage.setItem('events', jsonValue);
    } catch (e) {
      // saving error
      alert(e);
    }
  };

  const getEvents = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('events');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      alert('error loading');
    }
  };

  const RenderElement = ({ item }) => {
    const img = item.artist_item.image ? { uri: 'https://admin.poolbar.at/assets/' + item.artist_item.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(item.day_item.date_start);
    const dateString = date.toLocaleDateString('de-DE', dateOptions);

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
              name={item.liked ? 'heart' : 'heart-o'}
              size={32}
              color="#2ECDA7"
              onPress={() => {
                likeItem(item.id);
              }}
            />
            <Text style={StylesMain.labelMain}>{item.name || item.artist_item.name}</Text>
            <Text style={StylesMain.labelText}>{dateString}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
