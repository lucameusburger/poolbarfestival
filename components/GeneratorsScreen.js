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

const GeneratorsScreen = ({ router, navigation }) => {
  const [generators, setGenerators] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGenerators = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/generator_projects');
    const data = await resp.json();
    let fetchedGenerators = data.data || [];

    // fetch lab
    await Promise.all(
      fetchedGenerators.map(async (item) => {
        item.artist_item = {};
        if (!item.artist) return item;
        const resp = await fetch('https://www.admin.poolbar.at/items/generator_labs/' + item.artist);
        const data = await resp.json();
        if (!data.data) return item;
        item.artist_item = data.data;

        return item;
      })
    );

    setGenerators(fetchedGenerators);
    setLoading(false);
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
    fetchGenerators();
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="generator" navigation={navigation} />
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>
          {loading && <LoadingText />}
          {generators && <FlatList style={{ flex: 1 }} data={generators} renderItem={RenderElement} keyExtractor={(item) => item.id} />}
        </View>

        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default GeneratorsScreen;
