import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from '../modules/NavBar';
import FadeInView from '../modules/FadeInView';
import StylesMain from '../styles/StylesMain';

const ArtistsScreen = ({ navigation }) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArtists = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/artists');
    const data = await resp.json();
    setArtists(data.data);
    setLoading(false);
  };

  const RenderElement = ({ item }) => {
    const img = item.image ? { uri: 'https://admin.poolbar.at/assets/' + item.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Artist', {
            id: item.id,
          })
        }
      >
        <View style={{ flex: 1, width: '100%' }}>
          <ImageBackground source={img} resizeMode="cover" style={{ flex: 1, width: '100%', height: 200 }}>
            <Text style={StylesMain.labelMain}>{item.name}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="artists" />
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>
          {loading && <Text style={{ flex: 1, color: '#fff', fontSize: 33, alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto', backgroundColor: '#000' }}>loading</Text>}
          {artists && <FlatList style={{ flex: 1 }} data={artists} renderItem={RenderElement} keyExtractor={(item) => item.id} />}
        </View>

        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default ArtistsScreen;
