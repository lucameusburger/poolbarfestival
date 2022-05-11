import { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import ProgressBar from '../ui/ProgressBar';
import { FontAwesome } from '@expo/vector-icons';
import { navigate } from '../../core/RootNavigation';

function openScann(scann) {
  const screens = {
    event: 'Event',
    artist: 'Artist',
    generator: 'Generator',
  };
  navigate(screens[scann.type], {
    id: scann.id,
  });
}

const ScanCollection = ({ collection, events, artists, generators }) => {
  const showCollection = [];

  collection.forEach((item) => {
    let name = '';
    let type_name = '';

    if (item.type === 'generator') {
      type_name = 'generator projekt';
      name = generators.find((generator) => generator.id === item.id)?.name;
    }

    if (item.type === 'artist') {
      type_name = 'artist';
      name = artists.find((artist) => artist.id === item.id)?.name;
    }

    if (item.type === 'event') {
      type_name = 'event';
      name = events.find((event) => event.id === item.id)?.name;
    }

    if (name) {
      showCollection.push({
        ...item,
        name,
        type_name,
      });
    }
  });

  return collection && collection.length > 0 ? (
    showCollection.map((item, index) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            borderBottomWidth: 2,
            borderBottomColor: 'black',
          }}
          key={item.id}
          onPress={() => openScann(item)}
        >
          <View
            style={{
              width: '100%',
              marginTop: 'auto',
              marginBottom: 'auto',
              flexDirection: 'row',
            }}
          >
            <FontAwesome
              style={{
                alignSelf: 'flex-end',
                marginBottom: 'auto',
                marginTop: 'auto',
                alignItems: 'center',
              }}
              name={'qrcode'}
              size={50}
              color={'#000000'}
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
                <Text style={StylesMain.listMainText}>{item.name}</Text>
                <Text style={StylesMain.listDateText}>{item.type_name}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    })
  ) : (
    <Text style={{ alignSelf: 'center', marginTop: 30 }}>Noch keine Scans vorhanden 💔</Text>
  );
};

const ScanCollectionScreen = ({}) => {
  const dispatch = useDispatch();

  const [generatorsCount, setGeneratorsCount] = useState(0);
  const [generatorsScannedCount, setGeneratorsScannedCount] = useState(0);

  const scans = useSelector((state) => state.scanns.data);
  const events = useSelector((state) => state.events.data);
  const artists = useSelector((state) => state.artists.artists);
  const generators = useSelector((state) => state.generators.data);
  const beerCode = useSelector((state) => state.beer.code);
  const redemed = useSelector((state) => state.beer.redemed);
  useEffect(() => {
    setGeneratorsCount(generators.length);
    setGeneratorsScannedCount(scans.filter((item) => item.type === 'generator').length);
  }, [generators]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="scans" />
        <View
          style={{
            padding: 10,
            borderBottomColor: '#000000',
            borderBottomWidth: 2,
          }}
        >
          <ProgressBar text={beerCode} value={generatorsScannedCount} maxvalue={generatorsCount} />
        </View>
        <ScrollView style={{ flex: 1 }}>{!scans || !artists || !events || !generators ? <LoadingText /> : <ScanCollection events={events} collection={scans} generators={generators} artists={artists} />}</ScrollView>
      </FadeInView>
    </View>
  );
};

export default ScanCollectionScreen;
