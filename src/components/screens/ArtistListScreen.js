import { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
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
const ArtistListScreen = ({ item }) => {
  return (
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
        <View style={{}}></View>
        <View style={{}}>
          <View
            style={{
              marginLeft: 20,
              marginTop: 'auto',
              marginBottom: 'auto',
              width: '100%',
            }}
          >
            <Text style={StylesMain.artistListDateText}>{item.category}</Text>
            <Text style={StylesMain.artistListMainText}>{item.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ArtistsList = ({ artists }) => <FlatList style={{ flex: 1, height: '100%' }} data={artists} renderItem={ArtistListScreen} keyExtractor={(item) => item.id} />;

const ArtistsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const artists = useSelector((state) => state.artists.artists);
  const events = useSelector((state) => state.events.data);
  const [displayedArtists, setDisplayedArtists] = useState([]);
  const isLoaded = useSelector((state) => state.artists.isLoaded);

  function sortArtistsAlphabetically(artists) {
    if (!artists) return null;
    return artists.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  function filterPlaysInCurrentYear(artists) {
    if (!events) {
      return null;
    }
    const now = new Date();
    const currentYearEvents = events.filter((event) => {
      const eventDate = new Date(event.day_item.date_start);
      return eventDate.getFullYear() === now.getFullYear();
    });
    const currentYearEventIds = currentYearEvents.map((event) => event.artist);
    return artists.filter((artist) => currentYearEventIds.includes(artist.id));
  }

  useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchEvents());
  }, []);

  useEffect(() => {
    setDisplayedArtists(sortArtistsAlphabetically(filterPlaysInCurrentYear(artists)));
  }, [artists]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          navigation={navigation}
          title="artists"
          next={() => {
            navigation.navigate('ArtistHistory');
          }}
          nextTitle={'history'}
        />
        <View style={{ flex: 1 }}>{!isLoaded ? <LoadingText /> : displayedArtists ? <ArtistsList artists={displayedArtists} /> : <LoadingText />}</View>
      </FadeInView>
    </View>
  );
};

export default ArtistsScreen;
