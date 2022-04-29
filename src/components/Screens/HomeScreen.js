import { View, ImageBackground, Text, Pressable, SafeAreaView, NativeModules, Platform } from 'react-native';
import FadeInView from '../ui/FadeInView';
import PoolbarLogoAnimated from '../ui/PoolbarLogoAnimated';
import AppButton from '../ui/AppButton';
import AppCornerButton from '../ui/AppCornerButton';
import StylesMain from '../../../styles/StylesMain';
import gridImage from '../../../assets/img/grid.png';
import { CLR_PRIMARY } from '../../core/Theme';

const cameraIcon = require('../../../assets/img/camera-icon.png');
const mapIcon = require('../../../assets/img/map-icon.png');

const estimatedStatusBarHeight = NativeModules.NativeUnimoduleProxy?.modulesConstants?.ExponentConstants?.statusBarHeight ?? 0;

const APPROX_STATUSBAR_HEIGHT = Platform.select({
  android: estimatedStatusBarHeight,
  ios: Platform.Version < 11 ? estimatedStatusBarHeight : 0,
});

const Wrapper = typeof APPROX_STATUSBAR_HEIGHT.statusBarHeight === 'number' ? View : SafeAreaView;

const HomeScreen = ({ navigation }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <Wrapper style={{ margin: 0, backgroundColor: '#00ff00', zIndex: 999, position: 'absolute', left: 0, right: 0, top: 0 }}>
          <View
            style={{
              width: '150%',
              alignSelf: 'center',
              transform: [{ rotate: '-2deg' }],
              backgroundColor: CLR_PRIMARY,
              paddingTop: 16,
            }}
          >
            <Text
              style={{
                fontFamily: 'HelviotopiaMedium',
                alignSelf: 'center',
                marginTop: 'auto',
                marginBottom: 5,
                fontSize: 28,
              }}
            >
              07. Jul – 14. Aug 2022
            </Text>
          </View>
        </Wrapper>
        <ImageBackground source={gridImage} width="100%" height="100%" style={{ flex: 1, width: '100%', height: '100%' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View>
              <View
                style={{
                  marginBottom: '10%',
                  width: '80%',
                  height: '33%',
                  alignSelf: 'center',
                }}
              >
                <Pressable onPress={() => navigation.navigate('Credits')}>
                  <PoolbarLogoAnimated style={{ alignSelf: 'center' }} width="100%" height="100%" fill="black" />
                </Pressable>
              </View>
              <View style={{ top: 0, marginTop: 0 }}>
                <AppButton style={{ width: '50%' }} title="events" onPress={() => navigation.navigate('Events')} bevelLeft={true} />
                <View style={{ height: '3%' }} />
                <AppButton style={{ width: '50%' }} title="artists" onPress={() => navigation.navigate('Artists')} />
                <View style={{ height: '3%' }} />
                <AppButton style={{ width: '50%' }} title="generator" onPress={() => navigation.navigate('Generators')} bevelLeft={true} />
                <View style={{ height: '3%' }} />
                <AppButton style={{ width: '50%' }} title="fließtext" onPress={() => navigation.navigate('Flowtext')} bevelLeft={false} />
              </View>
            </View>

            <AppCornerButton icon={mapIcon} position="lb" onPress={() => navigation.navigate('Map')} bevelLeft={false} />
            <AppCornerButton icon={cameraIcon} position="rb" onPress={() => navigation.navigate('Scan')} bevelLeft={false} />
          </View>
        </ImageBackground>
      </FadeInView>
    </View>
  );
};

export default HomeScreen;
