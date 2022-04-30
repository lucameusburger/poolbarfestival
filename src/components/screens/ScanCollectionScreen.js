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

import artistPlaceholder from '../../../assets/img/artistPlaceholder.jpg';

import { Video, AVPlaybackStatus } from 'expo-av';

const BASE_URL = 'https://www.admin.poolbar.at/';

const ScanCollection = ({ collection }) => {
  const video = useRef('../../../assets/video/ladder.mp4');

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
          onPress={() =>
            navigate('Artist', {
              id: item.id,
            })
          }
        >
          <View
            style={{
              width: '100%',
              marginTop: 'auto',
              marginBottom: 'auto',
              flexDirection: 'row',
            }}
          >
            <PoolbarImage
              imageId={item.image}
              fallback={artistPlaceholder}
              style={{
                width: 50,
                height: 50,
                borderRadius: 300,
                alignItems: 'center',
              }}
            />
            <View style={{}}>
              <View
                style={{
                  marginLeft: 20,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  width: '100%',
                }}
              >
                <Text style={StylesMain.artistListDateText}>{item.collection}</Text>
                <Text style={StylesMain.artistListMainText}>{item.name}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))
  ) : (
    <Text style={{ alignSelf: 'center', marginTop: 30 }}>Noch keine Scans vorhanden</Text>
  );
};

const ScanCollectionScreen = ({}) => {
  const dispatch = useDispatch();

  const [collection, setCollection] = useState([{ id: 'asjndajsklndaksn', name: 'Stagedesign', collection: 'generator_projects' }]);

  const isLoaded = useSelector((state) => state.artists.isLoaded);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="sammlung" />
        <View style={{ padding: 10, borderBottomColor: '#000000', borderBottomWidth: 2 }}>
          <ProgressBar value={33} />
        </View>
        <ScrollView style={{ flex: 1 }}>{!isLoaded ? <LoadingText /> : <ScanCollection collection={collection} />}</ScrollView>
      </FadeInView>
    </View>
  );
};

export default ScanCollectionScreen;
