import { View, ImageBackground, Text, Pressable, SafeAreaView, NativeModules, Platform } from 'react-native';
import FadeInView from '../ui/FadeInView';
import PoolbarLogoAnimated from '../ui/PoolbarLogoAnimated';
import AppButton from '../ui/AppButton';
import AppCornerButton from '../ui/AppCornerButton';
import StylesMain from '../../../styles/StylesMain';
import gridImage from '../../../assets/img/grid.png';
import { CLR_PRIMARY } from '../../core/Theme';
import CountDown from '../ui/CountDown';

const cameraIcon = require('../../../assets/img/cam-icon.png');
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
        <ImageBackground source={gridImage} width="100%" height="100%" style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }}>
          <Wrapper style={{ margin: 0, left: 0, right: 0, top: 0 }}>
            <View
              shouldRasterizeIOS
              style={{
                width: '150%',
                alignSelf: 'center',
                transform: [{ rotate: '-4deg' }],
                backgroundColor: CLR_PRIMARY,
                paddingVertical: 10,
                marginTop: APPROX_STATUSBAR_HEIGHT + 10, //32
              }}
            >
              <Text
                style={{
                  fontFamily: 'HelviotopiaMedium',
                  alignSelf: 'center',
                  fontSize: 28,
                }}
              >
                07. Jul – 14. Aug 2022
              </Text>
            </View>
            <View
              shouldRasterizeIOS
              style={{
                width: '150%',
                alignSelf: 'center',
                transform: [{ rotate: '0deg' }],
                backgroundColor: CLR_PRIMARY,
                paddingVertical: 10,
                marginTop: 0,
              }}
            >
              <CountDown />
            </View>
          </Wrapper>
          <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', width: '100%', height: '100%' }}>
            <View style={{ display: 'flex' }}>
              <View
                style={{
                  marginBottom: 20,
                  height: '50%',
                  width: '80%',
                  alignSelf: 'center',
                }}
              >
                <Pressable onPress={() => navigation.navigate('Credits')} style={{ marginBottom: 20 }}>
                  <PoolbarLogoAnimated style={{ alignSelf: 'center' }} width="90%" height="100%" fill="black" />
                </Pressable>
                <View style={{ top: 0, marginTop: 0 }}>
                  <AppButton style={{ width: '78%', marginBottom: 10 }} title="events" onPress={() => navigation.navigate('Events')} bevelLeft={true} />
                  <AppButton style={{ width: '78%', marginBottom: 10 }} title="artists" onPress={() => navigation.navigate('Artists')} />
                  <AppButton style={{ width: '78%', marginBottom: 10 }} title="generator" onPress={() => navigation.navigate('Generators')} bevelLeft={true} />
                  <AppButton style={{ width: '78%', marginBottom: 0 }} title="fließtext" onPress={() => navigation.navigate('Flowtext')} bevelLeft={false} />
                </View>
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
