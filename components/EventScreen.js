import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, Image, openURL, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from '../modules/AppButton';
import NavBar from '../modules/NavBar';
import FadeInView from '../modules/FadeInView';
import StylesMain from '../styles/StylesMain';
import { FontAwesome } from '@expo/vector-icons';

const EventScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/events/' + id);
    const data = await resp.json();
    let fetchedEvent = data.data;

    // fetch day for single event
    fetchedEvent.day_item = {};
    if (fetchedEvent.day) {
      console.log('ja');
      const respDay = await fetch('https://www.admin.poolbar.at/items/days/' + fetchedEvent.day);
      const dataDay = await respDay.json();
      if (dataDay.data) {
        fetchedEvent.day_item = dataDay.data;
      }
    }

    // fetch artist for single event
    fetchedEvent.artist_item = {};
    if (fetchedEvent.artist) {
      console.log('ARTISTITEM_____');
      const respArtist = await fetch('https://www.admin.poolbar.at/items/artists/' + fetchedEvent.artist);
      const dataArtist = await respArtist.json();
      if (dataArtist.data) {
        fetchedEvent.artist_item = dataArtist.data;
      }
    }

    console.log(fetchedEvent);
    setEvent(fetchedEvent);
    setLoading(false);
  };

  const RenderElement = ({ item }) => {
    const img = item.image ? { uri: 'https://admin.poolbar.at/assets/' + item.image + '?fit=cover&width=500&height=200&quality=30' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=30' };

    let dateString = 'tba';

    if (item.day_item && item.day_item.date_start) {
      let dateOptions = { month: 'long', day: 'numeric' };
      let date = new Date(item.day_item.date_start);
      dateString = date.toLocaleDateString('en-US', dateOptions);
    }

    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={{ margin: 20 }}>
          <View style={StylesMain.card}>
            <Text style={{ fontSize: 60, fontFamily: 'Helviotopia' }}>{dateString}</Text>
            <Text>{item.description_short}</Text>
            <View style={{ height: 20 }}></View>
            <Text>{item.artist && item.artist_item.category ? item.artist_item.category : 'unknown'}</Text>
            <FontAwesome
              style={{ alignSelf: 'flex-end', marginRight: 10, marginBottom: 10 }}
              name={item.liked ? 'heart' : 'heart-o'}
              size={32}
              color="#fff"
              onPress={() => {
                likeItem(item.id);
              }}
            />
          </View>
          <AppButton style={{ alignSelf: 'left' }} title="tickets" onPress={() => navigation.navigate('Events')} />
          <AppButton style={{ alignSelf: 'left' }} title="artist" onPress={() => navigation.navigate('Events')} />
          <AppButton style={{ alignSelf: 'left' }} title="venue" onPress={() => navigation.navigate('Events')} />
          <Text>{(item.artist_item && item.artist_item.name) || 'kein artist'}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%' }}>
        <NavBar navigation={navigation} title={event.name} />
        <View style={{ marginBottom: 'auto', marginTop: 'auto', flex: 1 }}>
          {loading && <Text style={{ color: '#fff', fontSize: 33, alignSelf: 'center' }}>loading</Text>}
          {event && <RenderElement item={event} />}
        </View>
        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default EventScreen;
