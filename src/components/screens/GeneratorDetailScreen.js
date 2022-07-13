import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { useDispatch, useSelector } from 'react-redux';
import PoolbarImage from '../ui/PoolbarImage';
import LoadingText from '../ui/LoadingText';
import { fetchGenerators } from '../../redux/generatorsThunk';
import artistPlaceholder from '../../../assets/img/generatorProjectPlaceholder.jpg';
import { randomId } from '../../core/helpers';

const RenderMember = ({ member }) => {
  return (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        width: '100%',
      }}
    >
      <View
        style={{
          width: '100%',
          marginTop: 'auto',
          marginBottom: 'auto',
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <PoolbarImage
          imageId={member.image}
          fallback={artistPlaceholder}
          style={{
            width: 100,
            height: 100,
            borderRadius: 300,
            alignItems: 'center',
          }}
        />
        <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
          <View
            style={{
              marginLeft: 20,
              marginTop: 'auto',
              marginBottom: 'auto',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Text style={StylesMain.listDateText}>{member.year}</Text>
            <Text style={[StylesMain.listMainText, { flex: 1, width: '100%' }]} ellipsizeMode="tail">
              {member.name}
            </Text>
            {member.is_head && (
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <View>
                  <Text style={[StylesMain.textSmallBold, { backgroundColor: '#00ff00' }]}>Laborleiter·in</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const RenderElement = ({ generator }) => {
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={{ padding: 10, borderBottomWidth: 2 }}>
        <Text style={StylesMain.detailsMainText}>{generator.name}</Text>
      </View>
      <View style={{ padding: 10, borderBottomWidth: 2 }}>
        <Text style={StylesMain.detailsDateText}>{generator.lab_item.name}</Text>
      </View>
      <PoolbarImage
        imageId={generator.file_image}
        fallback={artistPlaceholder}
        style={{
          flex: 1,
          width: '100%',
        }}
      />
      {generator.description_short && (
        <View style={{ padding: 10, borderTopWidth: 2 }}>
          <View>
            <Text style={StylesMain.text}>{generator.description_short}</Text>
          </View>
        </View>
      )}
      {generator.members.length > 0 && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              padding: 10,
            }}
          >
            <Text style={StylesMain.detailsDateText}>Mitwirkende</Text>
          </View>
          <View style={{ flex: 1 }}>
            {generator.members.map((member) => (
              <RenderMember key={member.id} member={member} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const GeneratorDetailScreen = ({ route, navigation }) => {
  const id = route.params.id.trim();
  const isDeepLink = !!route.params.isDeepLink;
  const areGeneratorsLoaded = useSelector((state) => state.generators.isLoaded);
  const generators = useSelector((state) => state.generators.data);
  const scanns = useSelector((state) => state.scanns.data);
  const [selectedGenerator, setSelectedGenerator] = useState(null);
  const dispatch = useDispatch();
  const [addedDeepLink, setAddedDeepLink] = useState(false);

  useEffect(() => {
    dispatch(fetchGenerators());
  }, []);

  useEffect(() => {
    setAddedDeepLink(false);
  }, [id]);

  const beerCode = useSelector((state) => state.beer.code);

  useEffect(() => {
    if (isDeepLink && !addedDeepLink && areGeneratorsLoaded && scanns) {
      setAddedDeepLink(true);
      const generatorsCount = generators.length;
      const generatorsScannedCount = scanns.filter((scann) => scann.type === 'generator').length;
      const newGeneratorAlreadyScanned = scanns.find((scann) => scann.id === id && scann.type === 'generator');

      if ((!newGeneratorAlreadyScanned && generatorsCount === generatorsScannedCount - 1) || (generatorsCount === generatorsScannedCount && !beerCode)) {
        Alert.alert('Du hast alle Generatorprojekte gescannt!', 'Du kannst deinen Code für ein Gratisbier bei deinen Scanns finden. Solange der Vorrat reicht.');

        dispatch({
          type: 'SET_CODE',
          payload: randomId(8),
        });
      }
    }
  }, [generators, scanns, isDeepLink, areGeneratorsLoaded]);

  useEffect(() => {
    const generator = generators.find((generator) => generator.id === id);
    setSelectedGenerator(generator);
  }, [generators]);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%' }}>
        <NavBar navigation={navigation} title={'projekt'} />
        <ScrollView style={{ flex: 1 }}>{selectedGenerator ? <RenderElement generator={selectedGenerator} /> : <LoadingText />}</ScrollView>
      </FadeInView>
    </View>
  );
};

export default GeneratorDetailScreen;
