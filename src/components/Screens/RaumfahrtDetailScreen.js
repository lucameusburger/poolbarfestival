import React, { useEffect, useRef, useState } from 'react';
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

const RaumfahrtDetail = ({ spaceLocation }) => {
  console.log('sl', spaceLocation);
  return (
    <View style={StylesMain.credits}>
      <Text style={StylesMain.text}>{spaceLocation.name}</Text>
    </View>
  );
};

const RaumfahrtDetailScreen = ({ route }) => {
  const id = route.params.id.trim();
  const dispatch = useDispatch();

  const isLoaded = useSelector((state) => state.spaceLocations.isLoaded);
  const spaceLocations = useSelector((state) => state.spaceLocations.data);
  const [selectedSpaceLocation, setSelectedSpaceLocation] = useState(null);

  useEffect(() => {
    setSelectedSpaceLocation(spaceLocations.find((spaceLocation) => spaceLocation.id === id));
  }, [spaceLocations]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="raumfahrt" />
        <ScrollView style={{ flex: 1, marginTop: 10, padding: 10 }}>{!isLoaded || !selectedSpaceLocation ? <LoadingText /> : <RaumfahrtDetail spaceLocation={selectedSpaceLocation} />}</ScrollView>
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
