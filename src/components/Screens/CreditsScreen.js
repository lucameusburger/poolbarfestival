import React, { useEffect, useRef } from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openInbox, openComposer } from 'react-native-email-link';

import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchArtists } from '../../redux/artistsThunk';

import { Video, AVPlaybackStatus } from 'expo-av';

const BASE_URL = 'https://www.admin.poolbar.at/';

const Credits = () => {
  const video = useRef('../../../assets/video/ladder.mp4');

  return (
    <View style={StylesMain.credits}>
      <Text style={StylesMain.text}>Diese App wurde im Rahmen des poolbar Generator 2022 in Hohenems innerhalb einer Woche mit viel Liebe, Schweiß und Herzblut entwickelt ❤️ Es wurden dabei unzählige Tassen Kaffee konsumiert und genauso viele Ideen produziert. Wir hoffen die App gefällt Dir!</Text>
      <Video rate={1.0} isMuted={true} resizeMode="contain" ref={video} style={styles.video} source={require('../../../assets/video/ladder.mp4')} shouldPlay isLooping />
      <Text style={[StylesMain.textBold, { marginTop: 30 }]}>Idee und Konzept</Text>
      <Text style={[StylesMain.text, { marginTop: 0 }]}>Luca Meusburger</Text>
      <Text style={[StylesMain.textBold, { marginTop: 30 }]}>Programmierung</Text>
      <Text style={[StylesMain.text, { marginTop: 0 }]}>Lukas Fritsch, Luca Meusburger, Felix Kaufmann</Text>
      <Text style={[StylesMain.textBold, { marginTop: 30 }]}>Grafik und Design</Text>
      <Text style={[StylesMain.text, { marginTop: 0 }]}>Flurina Schneider, Allan Tavares</Text>
      <Text style={[StylesMain.textBold, { marginTop: 30 }]}>Kreatives Mitwirken</Text>
      <Text style={[StylesMain.text, { marginTop: 0 }]}>Alle bisher genannten</Text>
      <Text style={[StylesMain.text, { marginTop: 30 }]}>Interesse am Mitwirken an der App?</Text>
      <Text style={[StylesMain.text, { marginTop: 0 }]}>Melde Dich bei uns!</Text>

      <AppButton
        style={{ marginTop: 30, marginBottom: 30, alignSelf: 'flex-start' }}
        onPress={() => {
          openComposer({
            to: 'luca@lume.work',
            body: 'Hallo,\n Ich hätte Interesse an der App der poolbar mitzuwirken weil ...',
            subject: 'poolbar App Entwicklung',
          });
        }}
        title="Kontaktiere uns"
      />
    </View>
  );
};

const CreditsScreen = ({}) => {
  const dispatch = useDispatch();

  const isLoaded = useSelector((state) => state.artists.isLoaded);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="credits" />
        <ScrollView style={{ flex: 1, marginTop: 'auto', padding: 10 }}>{!isLoaded ? <LoadingText /> : <Credits />}</ScrollView>
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

export default CreditsScreen;
