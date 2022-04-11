import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchArtists } from '../../redux/artistsThunk';
import { navigate } from '../../core/RootNavigation';
import mapImage from '../../../assets/img/map.png'

const BASE_URL = 'https://www.admin.poolbar.at/';

const MapScreen = ({ navigation }) => {

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="map" />
        <ImageBackground source={mapImage} style={{ flex: 1, width: '100%', height: '100%' }} resizeMode='cover'/>

      </FadeInView>
    </View>


  );
};

export default MapScreen;
