import { useRef } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import * as Linking from 'expo-linking';

import AppButton from '../ui/AppButton';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';

import { Video } from 'expo-av';

const BASE_URL = 'https://www.admin.poolbar.at/';

const Info = () => {
  const video = useRef('../../../assets/video/ladder.mp4');

  return (
    <View>
      <Text style={[StylesMain.textBold, { marginBottom: 10 }]}>Der poolbar Generator 2022</Text>
      <Text style={StylesMain.text}>
        Die nächsten heißen Sommerabende im Reichenfeldpark und Alten Hallenbad in Feldkirch kommen bestimmt. Die jährlich neue gestalterische Basis für den Festivalspaß wird in der Osterwoche im Poolbar Generator gelegt, dem Labor für Festivaldesign. Kunst-, Design-, Architektur-, Sprach- und
        IT-Talente können sich ab sofort bewerben, um das Erscheinungsbild des kommenden Festivals mitzuentwickeln.
      </Text>
      <Video rate={1.0} isMuted={true} resizeMode="contain" ref={video} style={{ width: '100%', height: 300 }} source={require('../../../assets/video/ladder.mp4')} shouldPlay isLooping />
      <Text style={[StylesMain.textBold, { marginTop: 30 }]}>Kostenlos</Text>
      <Text style={[StylesMain.text, { marginTop: 10 }]}>Teilnahme Unterkunft in Hohenems Verpflegung in Hohenems Exkursionen, Museumseintritte Festivalpass bzw. Punktekarte</Text>
      <Text style={[StylesMain.textBold, { marginTop: 30 }]}>Input & Inspiration</Text>
      <Text style={[StylesMain.text, { marginTop: 10 }]}>Intensivlabor in Hohenems Nachbearbeitungslabor in Wien Gastkritiker:innen Öffentliche Vortragsreihen Firmenbesichtigungen Exkursionen</Text>
      <Text style={[StylesMain.textBold, { marginTop: 30 }]}>Labore</Text>
      <Text style={[StylesMain.text, { marginTop: 10 }]}>
        Architektur{'\n'}Innenarchitektur{'\n'}Grafik{'\n'}Produktdesign{'\n'}Digitale Projekte{'\n'}Public Art{'\n'}Street Art{'\n'}Literatur
      </Text>
      <AppButton
        style={{
          marginRight: 'auto',
          marginLeft: 0,
          marginBottom: 30,
          marginTop: 30,
        }}
        title="mehr erfahren"
        onPress={() => Linking.openURL('https://www.poolbar.at/generator/2022')}
      />
    </View>
  );
};

const GeneratorInfoScreen = ({}) => {
  const isLoaded = useSelector((state) => state.artists.isLoaded);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar title="generator" />
        <ScrollView style={{ flex: 1, padding: 10 }}>{!isLoaded ? <LoadingText /> : <Info />}</ScrollView>
      </FadeInView>
    </View>
  );
};

export default GeneratorInfoScreen;
