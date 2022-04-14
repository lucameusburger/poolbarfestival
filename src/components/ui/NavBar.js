import { View, StyleSheet, Platform, NativeModules, Animated } from 'react-native';
import { navigationRef } from '../../core/RootNavigation';
import AppHeading from './AppHeading';
import AppButton from './AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useRef } from 'react';

const estimatedStatusBarHeight = NativeModules.NativeUnimoduleProxy?.modulesConstants?.ExponentConstants?.statusBarHeight ?? 0;

const APPROX_STATUSBAR_HEIGHT = Platform.select({
  android: estimatedStatusBarHeight,
  ios: Platform.Version < 11 ? estimatedStatusBarHeight : 0,
});

const Wrapper = typeof APPROX_STATUSBAR_HEIGHT.statusBarHeight === 'number' ? View : SafeAreaView;

const generateUniqueKey = () => `_${Math.random().toString(36).substr(2, 9)}`;

const NavBar = ({ title, next, nextTitle }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start(() => scrollX.setValue(0));
  }, [scrollX]);

  return (
    <Wrapper style={{ backgroundColor: '#fff' }}>
      <View
        style={{
          width: '100%',
          top: 0,
          borderBottomWidth: 2,
          borderBottomColor: '#000',
        }}
      >
        <AppHeading title={title} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,

            marginHorizontal: '4%',
          }}
        >
          <AppButton
            style={{ width: '48%' }}
            title={'zurück'}
            onPress={() => {
              // handle the index we get
              if (navigationRef.canGoBack()) {
                navigationRef.goBack();
              } else {
                navigationRef.navigate('Home');
              }
            }}
          />
          {nextTitle && <AppButton style={{ width: '48%' }} title={nextTitle} onPress={next} />}
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Helviotopia',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default NavBar;
