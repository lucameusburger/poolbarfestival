import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openInbox, openComposer } from 'react-native-email-link';

import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import PoolbarImage from '../ui/PoolbarImage';
import { fetchArtists } from '../../redux/artistsThunk';

import ProgressBar from '../ui/ProgressBar';

import { Video, AVPlaybackStatus } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

const BASE_URL = 'https://www.admin.poolbar.at/';

const ScanCollection = ({ collection, events, artists, generators }) => {
  return collection && collection.length > 0 ? (
    collection &&
      collection.length &&
      collection.map((item) => (
        <TouchableOpacity
          style={{
            padding: 10,
            borderBottomWidth: 2,
            borderBottomColor: 'black',
          }}
          key={item.id}
          onPress={() => alert('hallo')}
        >
          <View
            style={{
              width: '100%',
              marginTop: 'auto',
              marginBottom: 'auto',
              flexDirection: 'row',
            }}
          >
            <FontAwesome style={{ alignSelf: 'flex-end', marginBottom: 'auto', marginTop: 'auto', alignItems: 'center' }} name={'qrcode'} size={50} color={'#000000'} />
            <View style={{}}>
              <View
                style={{
                  marginLeft: 20,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  width: '100%',
                }}
              >
                <Text style={StylesMain.artistListDateText}>{item.type}</Text>
                <Text style={StylesMain.artistListMainText}>{item.type === 'event' ? events.find((event) => event.id === item.id).name : item.type === 'artist' ? artists.find((artist) => artist.id === item.id).name : item.type === 'generator_project' ? generators.find((generator) => generator.id === item.id).name : 'unknown'}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))
  ) : (
    <Text style={{ alignSelf: 'center', marginTop: 30 }}>Noch keine Scans vorhanden 💔</Text>
  );
};

const ScanCollectionScreen = ({}) => {
  const dispatch = useDispatch();

  const scans = useSelector((state) => state.scanns.data);
  const events = useSelector((state) => state.events.data);
  const artists = useSelector((state) => state.artists.artists);
  const generators = useSelector((state) => state.generators.data);

  const [selectedScans, setSelectedScans] = useState([]);
  const isLoaded = useSelector((state) => state.artists.isLoaded);

  console.log(scans);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="scans" />
        <View style={{ padding: 10, borderBottomColor: '#000000', borderBottomWidth: 2 }}>
          <ProgressBar value={66} />
        </View>
        <ScrollView style={{ flex: 1 }}>{!isLoaded || !scans || !artists || !events || !generators ? <LoadingText /> : <ScanCollection events={events} collection={scans} generators={generators} artists={artists} />}</ScrollView>
      </FadeInView>
    </View>
  );
};

export default ScanCollectionScreen;
