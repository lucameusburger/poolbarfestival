import { View, ImageBackground, Text, Pressable } from 'react-native';
import FadeInView from '../ui/FadeInView';
import PoolbarLogoAnimated from '../ui/PoolbarLogoAnimated';
import AppButton from '../ui/AppButton';
import AppCornerButton from '../ui/AppCornerButton';
import StylesMain from '../../../styles/StylesMain';
import gridImage from '../../../assets/img/grid.png';
import { CLR_PRIMARY } from '../../core/Theme';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <ImageBackground source={gridImage} width="100%" height="100%" style={{ flex: 1, width: '100%', height: '100%' }}>
          <View
            style={{
              width: '150%',
              alignSelf: 'center',
              height: 100,
              transform: [{ rotate: '-2deg' }],
              backgroundColor: CLR_PRIMARY,
              marginTop: '-5%',
            }}
          >
            <Text
              style={{
                fontFamily: 'Helviotopia',
                alignSelf: 'center',
                marginTop: 'auto',
                marginBottom: 5,
                fontSize: 28,
              }}
            >
              07. Juli bis 14. August 2022
            </Text>
          </View>
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

            <AppCornerButton icon="map" position="lb" onPress={() => navigation.navigate('Map')} bevelLeft={false} />
            <AppCornerButton icon="camera" position="rb" onPress={() => navigation.navigate('Scan')} bevelLeft={false} />
          </View>
        </ImageBackground>
      </FadeInView>
    </View>
  );
};

export default HomeScreen;
