import { View, ImageBackground, Text, Dimensions } from 'react-native';
import FadeInView from '../ui/FadeInView';
import PoolbarLogo from '../ui/PoolbarLogo';
import AppButton from '../ui/AppButton';
import AppCornerButton from '../ui/AppCornerButton';
import StylesMain from '../../../styles/StylesMain';
import gridImage from '../../../assets/img/grid.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <ImageBackground source={gridImage} width="100%" height="100%" style={{ flex: 1, width: '100%', height: '100%' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View>
              <View style={{ width: '150%', alignSelf: 'center', height: 50, transform: [{ rotate: '-6deg' }], backgroundColor: '#00ff00', marginBottom: 10 + SCREEN_HEIGHT / 30 }}>
                <Text style={{ fontFamily: 'Helviotopia', alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto', fontSize: 28 }}>07 Juli bis 28 August 2022</Text>
              </View>
              <View style={{ marginBottom: 24 + SCREEN_HEIGHT / 40, width: '80%', height: '33%', alignSelf: 'center' }}>
                <PoolbarLogo style={{ alignSelf: 'center' }} width="100%" height="100%" fill="black" />
              </View>
              <View style={{ top: 0, marginTop: 0 }}>
                <AppButton style={{ width: '50%' }} title="events" onPress={() => navigation.navigate('Events')} bevelLeft={true} />
                <View style={{ height: 4 + SCREEN_HEIGHT / 60 }} />
                <AppButton style={{ width: '50%' }} title="artists" onPress={() => navigation.navigate('Artists')} />
                <View style={{ height: 4 + SCREEN_HEIGHT / 60 }} />
                <AppButton style={{ width: '50%' }} title="generator" onPress={() => navigation.navigate('Generators')} bevelLeft={true} />
                <View style={{ height: 4 + SCREEN_HEIGHT / 60 }} />
                <AppButton style={{ width: '50%' }} title="fließtext" onPress={() => navigation.navigate('Flowtext')} bevelLeft={false} />
              </View>
            </View>

            <AppCornerButton icon="map" position="lb" onPress={() => navigation.navigate('Map')} bevelLeft={false} />
            <AppCornerButton icon="camera" position="rb" onPress={() => navigation.navigate('Scan')} bevelLeft={false} />
          </View>
        </ImageBackground>
      </FadeInView>
    </View>
  );
};

export default HomeScreen;
