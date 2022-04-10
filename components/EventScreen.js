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

const EventScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/events/' + id);
    const data = await resp.json();
    let fetchedEvent = data.data;

    // fetch day for single event
    if (fetchedEvent.day) {
      const respDay = await fetch('https://www.admin.poolbar.at/items/days/' + fetchedEvent.day);
      const dataDay = await respDay.json();
      if (dataDay.data) {
        fetchedEvent.day_item = dataDay.data;
      }
    }

    console.log(fetchedEvent);
    setEvent(fetchedEvent);
    setLoading(false);
  };

  const RenderElement = ({ item }) => {
    const img = item.image ? { uri: 'https://admin.poolbar.at/assets/' + item.image + '?fit=cover&width=500&height=200&quality=30' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=30' };
    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={{ alignSelf: 'center' }}>
          <NavBar navigation={navigation} title={item.name} />
          <Text>{item.category}</Text>
          {/* <Text>{item.day_item.date_start}</Text> */}
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
