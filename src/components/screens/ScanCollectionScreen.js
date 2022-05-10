import { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { randomId } from '../../core/helpers';
import ProgressBar from '../ui/ProgressBar';
import { CLR_PRIMARY } from '../../core/Theme';
import { FontAwesome } from '@expo/vector-icons';
import { navigate } from '../../core/RootNavigation';

function openScann(scann) {
  console.log(scann);
  const screens = {
    event: 'Event',
  };
  navigate(screens[scann.type], {
    id: scann.id,
  });
}

const ScanCollection = ({ collection, events, artists, generators }) => {
  const showCollection = [];
  console.log(events.find((event) => event.id === '80a90e9a-ec1c-4354-b256-673d107b8c06'));

  collection.forEach((item) => {
    let name = '';
    let type_name = '';
    console.log(item.id);

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
      console.log('char: ', '80a90e9a-ec1c-4354-b256-673d107b8c06'.charAt(9));
      console.log('charcode: ', '80a90e9a-ec1c-4354-b256-673d107b8c06'.charCodeAt(9));

      name = events.find((event) => event.id === item.id)?.name;
    }

    if (true || name) {
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
                <Text style={StylesMain.artistListMainText}>{item.name}</Text>
                <Text style={StylesMain.artistListDateText}>{item.type_name}</Text>
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
  const [generatorsSScannedCount, setGeneratorsScannedCount] = useState(0);

  const scans = useSelector((state) => state.scanns.data);
  const events = useSelector((state) => state.events.data);
  const artists = useSelector((state) => state.artists.artists);
  const generators = useSelector((state) => state.generators.data);
  const beerCode = useSelector((state) => state.beer.code);
  const redemed = useSelector((state) => state.beer.redemed);
  useEffect(() => {
    setGeneratorsCount(generators.length);
    setGeneratorsScannedCount(scans.filter((item) => item.type === 'generator').length);

    if (generatorsSScannedCount >= generatorsCount && beerCode !== null) {
      //dispatch({ type: "SET_CODE", payload: true });
      alert('h');
    }
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
          <ProgressBar value={generatorsSScannedCount} maxvalue={generatorsCount} />
          <View
            style={{
              backgroundColor: CLR_PRIMARY,
              width: '100%',
              height: 30,
              marginTop: 10,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {beerCode && (
              <Text
                style={{
                  fontFamily: 'Helviotopia',
                  color: 'black',
                  fontSize: 18,
                }}
              >
                {beerCode}
              </Text>
            )}
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>{!scans || !artists || !events || !generators ? <LoadingText /> : <ScanCollection events={events} collection={scans} generators={generators} artists={artists} />}</ScrollView>
      </FadeInView>
    </View>
  );
};

export default ScanCollectionScreen;
