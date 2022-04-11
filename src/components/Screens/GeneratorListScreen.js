import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from '../ui/AppButton';
import LoadingText from '../ui/LoadingText';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const GeneratorListScreen = ({ router, navigation }) => {
  const [generators, setGenerators] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGenerators = async () => {
    const resp = await fetch('https://www.admin.poolbar.at/items/generator_projects');
    const data = await resp.json();
    let fetchedGenerators = data.data || [];

    // fetch lab
    await Promise.all(
      fetchedGenerators.map(async (item) => {
        item.lab_item = {};
        if (!item.lab) return item;
        const resp = await fetch('https://www.admin.poolbar.at/items/generator_labs/' + item.lab);
        const data = await resp.json();
        if (!data.data) return item;
        item.lab_item = data.data;

        return item;
      })
    );

    setGenerators(fetchedGenerators);
    setLoading(false);
  };

  const RenderElement = ({ item }) => {
    const img = item.image ? { uri: 'https://admin.poolbar.at/assets/' + item.image + '?fit=cover&width=500&height=200&quality=80' } : { uri: 'https://admin.poolbar.at/assets/9c6f223c-795a-4bf5-b8c0-0630a555e465?fit=cover&width=500&height=200&quality=80' };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Generator_Project', {
            id: item.id,
          })
        }
      >
        <View key={item.id} style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={{ width: '100%', marginTop: 'auto', backgroundColor: '#000' }}>
            <Text style={StylesMain.labelMain}>{item.name || 'no name'}</Text>
            <Text style={StylesMain.labelMain}>{(item.lab_item && item.lab_item.name) || 'no lab'}</Text>
          </View>
        </View>
        <View style={{ height: 20 }}></View>
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

export default GeneratorListScreen;
