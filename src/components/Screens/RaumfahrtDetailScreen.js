import React, { useEffect, useRef } from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openInbox, openComposer } from 'react-native-email-link';

import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchLocations } from '../../redux/locationsThunk';

const BASE_URL = 'https://www.admin.poolbar.at/';

const RaumfahrtDetail = () => {
  return (
    <View style={StylesMain.credits}>
      <Text style={StylesMain.text}>info raumfahrtprogramm</Text>
    </View>
  );
};

const RaumfahrtDetailScreen = ({}) => {
  const dispatch = useDispatch();

  const isLoaded = useSelector((state) => state.artists.isLoaded);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="raumfahrtprogramm" />
        <ScrollView style={{ flex: 1, marginTop: 10, padding: 10 }}>{!isLoaded ? <LoadingText /> : <RaumfahrtDetail />}</ScrollView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 300,
  },
  creditsDateText: {
    fontFamily: 'HelviotopiaBold',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 20,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  creditsMainText: {
    fontFamily: 'Helviotopia',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 42,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});

export default RaumfahrtDetailScreen;
