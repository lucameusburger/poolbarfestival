import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SectionList, Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../modules/NavBar';
import LoadingText from '../modules/LoadingText';
import FadeInView from '../modules/FadeInView';
import StylesMain from '../styles/StylesMain';
import { fetchArtists } from '../redux/artistsThunk';
import { navigate } from '../core/RootNavigation';

const BASE_URL = 'https://www.admin.poolbar.at/';

const ArtistsHistoryComponent = ({ item }) => {

  return (
 
      <View style={{ flex: 1, width: '100%' }}>

          <View style={StylesMain.labelContainer}>
            <Text style={StylesMain.labelText}>{item.name}</Text>
          </View>

      </View>

  );
};

const ArtistsList = ({ artists }) => {
  return <SectionList style={{ flex: 1 }} 
    sections={[
      {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
      {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
    ]}
    //data={artists} 
    renderItem={({item}) => <Text>{item}</Text>}/>;
}

const ArtistsHistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const artists = useSelector((state) => state.artists.artists);
  const isLoaded = useSelector((state) => state.artists.isLoaded);
  const isFetchingData = useSelector((state) => state.artists.isFetchingData);
  const hasFetchingDataError = useSelector((state) => state.artists.hasFetchingDataError);

  useEffect(() => {
    dispatch(fetchArtists());
  }, []);
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="all artists" />
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>
          {
            !isLoaded ?
              <LoadingText /> :
              artists ?
                <ArtistsList artists={artists} /> :
                <LoadingText />
          }
        </View>
        <StatusBar style="auto" />
      </FadeInView>
    </View>
  );
};

export default ArtistsScreen;
