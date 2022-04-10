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
    const resp = await fetch('https://www.admin.poolbar.at/items/events?sort=day,asc');
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

    let dateString = 'tba';
    if (item.day_item && item.day_item.date_start) {
      let dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      let date = new Date(item.day_item.date_start);
      dateString = date.toLocaleDateString('de-DE', dateOptions);
    }

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
              <FontAwesome
                style={{ alignSelf: 'flex-end', marginBottom: 'auto', marginTop: 'auto' }}
                name={item.liked ? 'heart' : 'heart-o'}
                size={32}
                color="#2ECDA7"
                onPress={() => {
                  likeItem(item.id);
                }}
              />
            </View>
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
        <View style={{ flex: 1, margin: 20 }}>
          {loading && <LoadingText />}
          {events && <FlatList style={{ flex: 1 }} data={events} renderItem={RenderElement} keyExtractor={(item) => item.id} />}
        </View>

        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default EventsScreen;
