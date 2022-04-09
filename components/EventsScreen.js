import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from '../modules/AppButton';
import FadeInView from '../modules/FadeInView';
import StylesMain from '../styles/StylesMain';

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/events');
    const data = await resp.json();
    let events = data.data;

    // fetch day
    await Promise.all(
      events.map(async (item) => {
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
      events.map(async (item) => {
        item.artist_item = {};
        if (!item.artist) return item;
        const resp = await fetch('https://www.admin.poolbar.at/items/artists/' + item.artist);
        const data = await resp.json();
        if (!data.data) return item;
        item.artist_item = data.data;

        return item;
      })
    );

    //console.log(events);

    setEvents(events);
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
  };

  const RenderElement = ({ item }) => {
    const img = item.artist_item.image ? { uri: 'https://admin.poolbar.at/assets/' + item.artist_item.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(item.day_item.date_start);
    const dateString = date.toLocaleDateString('de-DE', dateOptions);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Artist', {
            id: item.id,
          })
        }
      >
        <View key={item.id} style={{ flex: 1, width: '100%' }}>
          <ImageBackground source={img} resizeMode="cover" style={{ flex: 1, width: '100%', height: 300 }}>
            <Text style={StylesMain.labelMain}>{item.name}</Text>
            <Text style={StylesMain.labelMain}>{dateString}</Text>
            <Text style={StylesMain.labelMain}>{item.artist_item.name}</Text>
            <Button
              title={item.liked ? 'liked' : 'like'}
              onPress={() => {
                likeItem(item.id);
              }}
            />
          </ImageBackground>
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
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>
          {loading && <Text style={{ flex: 1, color: '#fff', fontSize: 33, alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto', backgroundColor: '#000' }}>loading</Text>}
          {events && <FlatList style={{ flex: 1 }} data={events} renderItem={RenderElement} keyExtractor={(item) => item.id} />}
        </View>

        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default EventsScreen;
