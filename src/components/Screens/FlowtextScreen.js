import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchArtists } from '../../redux/artistsThunk';
import { navigate } from '../../core/RootNavigation';
import PoolbarImage from '../ui/PoolbarImage';
import artistPlaceholder from '../../../assets/img/artistPlaceholder.jpg';
import { fetchEvents } from '../../redux/eventsThunk';

const FlowtextGame = ({ item }) => {
  return <View style={{ width: '100%', height: '100%' }}>{flowtextElements}</View>;
};

const FlowtextElement = ({ text }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        const newPhrase = phrase + text;
        setPhrase(newPhrase);
        console.log(phrase);
      }}
    >
      {text}
    </TouchableOpacity>
  );
};

const FlowtextScreen = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [flowtexts, setFlowtexts] = useState(['Hallo', 'Hund', 'Dachs', 'ist', 'ein', 'Wolf', 'Lukas', 'ist', 'ein']);
  const [flowtextElements, setFlowtextElements] = useState([]);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('asd');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          navigation={navigation}
          title="artists"
          next={() => {
            console.log('teilen');
          }}
          nextTitle={'teilen'}
        />
        <Text>{phrase}</Text>
        <View style={{ flex: 1 }}>{!isLoaded ? <LoadingText /> : flowtexts ? <FlowtextGame artists={flowtexts} /> : <LoadingText />}</View>
      </FadeInView>
    </View>
  );
};

export default FlowtextScreen;
