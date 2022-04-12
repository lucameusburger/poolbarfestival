import React, { useState, useEffect } from 'react';
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

const RoomDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchRoom = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/rooms/' + id);
    const data = await resp.json();
    let fetchedRoom = data.data;

    // todo: fetch events for room

    console.log(fetchedRoom);
    setRoom(fetchedRoom);
    setLoading(false);
  };

  const RenderElement = ({ item }) => {
    const img = item.image ? { uri: 'https://admin.poolbar.at/assets/' + item.image + '?fit=cover&width=500&height=200&quality=30' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=30' };
    console.log(img);

    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={{ backgroundColor: '#c6c300', padding: 20, marginTop: 10 }}>
          <View>
            <Text style={styles.roomDateText}>poolbar</Text>
            <Text style={styles.roomMainText}>{item.name}</Text>
            <Text style={StylesMain.text}>{item.description}</Text>
            <View style={{ height: 20 }}></View>
          </View>
          <Image
            source={img}
            resizeMode="cover"
            style={{
              flex: 1,
              width: '100%',
              height: 320,
            }}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%' }}>
        <NavBar navigation={navigation} title={'artist'} />
        <ScrollView style={{ flex: 1 }}>{selectedArtist ? <ArtistDetailScreen artist={selectedArtist} /> : <LoadingText />}</ScrollView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  roomDateText: {
    fontFamily: 'HelviotopiaBold',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 24,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  roomMainText: {
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

export default RoomDetailScreen;
