import React, { useState, useEffect } from 'react';
import { navigationRef } from '../../core/RootNavigation';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import TypeWriter from 'react-native-typewriter';

import { fetchArtist } from '../../redux/artistsThunk';
import PoolbarImage from '../ui/PoolbarImage';

const SplashScreen = ({ route }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#000000' }}>
        <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
          <TypeWriter
            style={{ alignSelf: 'center', position: 'absolute', width: '100%', padding: 60, color: '#ffffff', textAlign: 'justify', opacity: 1, fontFamily: 'Helviotopia' }}
            typing={1}
            minDelay={60}
            maxDelay={120}
            onTypingEnd={() => {
              navigationRef.navigate('Home');
            }}
          >
            Ran an den Rand!Ran an den Rand!Ran an den Rand!
          </TypeWriter>
        </View>
      </FadeInView>
    </View>
  );
};

export default SplashScreen;
