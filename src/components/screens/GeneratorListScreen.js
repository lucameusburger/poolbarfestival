import { useEffect } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';
import LoadingText from '../ui/LoadingText';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchGenerators } from '../../redux/generatorsThunk';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '../../core/RootNavigation';

const RenderElement = ({ item }) => {
  return (
    <Pressable
      onPress={() =>
        navigate('Generator', {
          id: item.id,
        })
      }
      style={{
        marginBottom: 0,
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
      }}
    >
      <View key={item.id} style={{ width: '100%', marginTop: 'auto', flexDirection: 'row' }}>
        <View style={{ width: '100%', marginTop: 'auto', flexDirection: 'row' }}>
          <View style={{ width: '80%' }}>
            <Text style={StylesMain.artistListDateText}>{(item.lab_item && item.lab_item.name) || 'no lab'}</Text>
            <Text style={StylesMain.artistListMainText}>{item.name || 'no name'}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const GeneratorListScreen = ({ router, navigation }) => {
  const dispatch = useDispatch();
  const generators = useSelector((state) => state.generators.data);

  useEffect(() => {
    dispatch(fetchGenerators());
  }, []);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          title="generator"
          navigation={navigation}
          next={() => {
            navigation.navigate('GeneratorInfo');
          }}
          nextTitle={'info'}
        />
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>{generators ? <FlatList style={{ flex: 1 }} data={generators} renderItem={RenderElement} keyExtractor={(item) => item.id} /> : <LoadingText />}</View>
      </FadeInView>
    </View>
  );
};

export default GeneratorListScreen;
