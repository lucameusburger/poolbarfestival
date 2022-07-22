import { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchArtists } from '../../redux/artistsThunk';

const ArtistsList = ({ artists }) => {
  let text = '';

  // sort artists by abc
  artists.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  artists.forEach((item) => {
    text += item.name + ' //';
  });
  return <Text style={StylesMain.artistHistory}>{text}</Text>;
};

const ArtistHistoryListScreen = ({}) => {
  const dispatch = useDispatch();

  const artists = useSelector((state) => state.artists.artists);
  const isLoaded = useSelector((state) => state.artists.isLoaded);
  const isFetchingData = useSelector((state) => state.artists.isFetchingData);
  const hasFetchingDataError = useSelector(
    (state) => state.artists.hasFetchingDataError
  );

  useEffect(() => {
    dispatch(fetchArtists());
  }, []);
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="history" />
        <ScrollView style={{ flex: 1, marginTop: 'auto', padding: 10 }}>
          {artists && artists.length > 0 ? (
            <ArtistsList artists={artists} />
          ) : (
            <LoadingText />
          )}
        </ScrollView>
      </FadeInView>
    </View>
  );
};

export default ArtistHistoryListScreen;
