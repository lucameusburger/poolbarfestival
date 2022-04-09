import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, Image, openURL, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from '../modules/AppButton';
import FadeInView from '../modules/FadeInView';
import StylesMain from '../styles/StylesMain';

const ArtistScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArtist = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/artists/' + id);
    const data = await resp.json();
    console.log(data.data);
    setArtist(data.data);
    setLoading(false);
  };

  const RenderElement = ({ item }) => {
    const img = item.image ? { uri: 'https://admin.poolbar.at/assets/' + item.image + '?fit=cover&width=500&height=200&quality=30' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=30' };
    console.log(img);
    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <ImageBackground source={img} resizeMode="cover" style={{ flex: 1, width: '100%', height: '100%' }} blurRadius={30}>
          <View style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
            <Text style={StylesMain.labelMain}>{item.name}</Text>
            {item.url_spotify && (
              <TouchableOpacity style={{ marginTop: 0, marginBottom: 'auto' }} onPress={() => Linking.openURL(item.url_spotify)}>
                <Text style={StylesMain.buttonSecond}>play on spotify</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%' }}>
        <View style={{ marginBottom: 'auto', marginTop: 'auto', flex: 1 }}>
          {loading && <Text style={{ color: '#fff', fontSize: 33, alignSelf: 'center' }}>loading</Text>}
          {artist && <RenderElement item={artist} />}
        </View>
        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default ArtistScreen;
