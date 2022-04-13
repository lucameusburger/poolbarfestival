import { useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import LoadingText from '../ui/LoadingText';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchGenerators } from '../../redux/generatorsThunk';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '../../core/RootNavigation';

const RenderElement = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('Generator', {
          id: item.id,
        })
      }
    >
      <View key={item.id} style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        <View style={{ width: '100%', marginTop: 'auto', flexDirection: 'row' }}>
          <View style={{ width: '80%' }}>
            <Text style={StylesMain.generatorListDateText}>{(item.lab_item && item.lab_item.name) || 'no lab'}</Text>
            <Text style={StylesMain.generatorListMainText}>{item.name || 'no name'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
        <NavBar title="generator" navigation={navigation} />
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>{generators ? <FlatList style={{ flex: 1, padding: 20 }} data={generators} renderItem={RenderElement} keyExtractor={(item) => item.id} /> : <LoadingText />}</View>
      </FadeInView>
    </View>
  );
};

export default GeneratorListScreen;
