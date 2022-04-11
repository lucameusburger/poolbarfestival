import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, ScrollView, Button, Item, FlatList, ImageBackground, Image, openURL, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

const EventDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const likedEvents = useSelector((state) => state.favorites.likedEvents);
  const dispatch = useDispatch();

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

  const fetchEvent = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/events/' + id);
    const data = await resp.json();
    let fetchedEvent = data.data;

    // fetch room
    fetchedEvent.room_item = {};
    if (fetchedEvent.room) {
      const respRoom = await fetch('https://www.admin.poolbar.at/items/rooms/' + fetchedEvent.room);
      const dataRoom = await respRoom.json();
      if (dataRoom.data) {
        fetchedEvent.room_item = dataRoom.data;
      }
    }

    // fetch day for single event
    fetchedEvent.day_item = {};
    if (fetchedEvent.day) {
      const respDay = await fetch('https://www.admin.poolbar.at/items/days/' + fetchedEvent.day);
      const dataDay = await respDay.json();
      if (dataDay.data) {
        fetchedEvent.day_item = dataDay.data;
      }
    }

    // fetch artist for single event
    fetchedEvent.artist_item = {};
    if (fetchedEvent.artist) {
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
      dateString = date.toLocaleDateString('en-US', dateOptions).toUpperCase();
    }

    const isLiked = likedEvents.includes(item.id);

    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={{ backgroundColor: '#c6c300', padding: 20, marginTop: 10 }}>
          <View>
            <Text style={styles.eventDateText}>{dateString}</Text>
            <Text style={styles.eventMainText}>{item.name}</Text>
            <Text style={StylesMain.text}>{item.description_short}</Text>
            <View style={{ height: 20 }}></View>
            <Text style={StylesMain.text}>{item.artist && item.artist_item.category ? item.artist_item.category : ''}</Text>
            <Text style={StylesMain.text}>{item.room && item.room_item ? item.room_item.name : ''}</Text>
            <FontAwesome
              style={{ alignSelf: 'flex-end', marginRight: 10, marginBottom: 10 }}
              name={isLiked ? 'heart' : 'heart-o'}
              size={32}
              color="#000"
              onPress={() => {
                if (isLiked) {
                  unLikeEvent(item.id);
                } else {
                  likeEvent(item.id);
                }
              }}
            />
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <AppButton style={{ marginRight: 'auto', marginLeft: 0, marginBottom: 10, alignSelf: 'left' }} title="hol dir tickets" onPress={() => Linking.openURL(event.url_ticket)} />
          <AppButton
            style={{ marginRight: 'auto', marginLeft: 0, marginBottom: 10, alignSelf: 'left' }}
            title="artist ansehen"
            onPress={() =>
              navigation.navigate('Artist', {
                id: item.artist,
              })
            }
          />
          <AppButton style={{ marginRight: 'auto', marginLeft: 0 }} title="zur venue" onPress={() => navigation.navigate('Events')} />
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
        <NavBar navigation={navigation} title={'event'} />
        <ScrollView style={{ flex: 1 }}>
          {loading && <Text style={{ color: '#fff', fontSize: 33, alignSelf: 'center' }}>loading</Text>}
          {event && <RenderElement item={event} />}
        </ScrollView>
        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  eventDateText: {
    fontFamily: 'HelviotopiaBold',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 24,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  eventMainText: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 32,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});

export default EventDetailScreen;
