import { useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchArtists } from '../../redux/artistsThunk';

const BASE_URL = 'https://www.admin.poolbar.at/';

const Credits = () => {
  return (
    <View style={StylesMain.credits}>
      <Text style={styles.creditsDateText}>credits</Text>
      <Text style={styles.creditsMainText}>poolbar festival app</Text>
      <Text style={StylesMain.text}>App by Luca Meusburger, Lukas Fritsch, Flurina Schneider, Felix Kaufmann, Allan Tavares. Alle Rechte vorbehalten 2022.</Text>
    </View>
  );
};

const CreditsScreen = ({}) => {
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
        <NavBar title="credits" />
        <ScrollView style={{ flex: 1, marginTop: 'auto', padding: 10 }}>{!isLoaded ? <LoadingText /> : <Credits />}</ScrollView>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
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
