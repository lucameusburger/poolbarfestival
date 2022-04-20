import { View, Platform, NativeModules, SafeAreaView } from 'react-native';
import { navigationRef } from '../../core/RootNavigation';
import AppHeading from './AppHeading';
import AppButton from './AppButton';
import { memo } from 'react';

const estimatedStatusBarHeight = NativeModules.NativeUnimoduleProxy?.modulesConstants?.ExponentConstants?.statusBarHeight ?? 0;

const APPROX_STATUSBAR_HEIGHT = Platform.select({
  android: estimatedStatusBarHeight,
  ios: Platform.Version < 11 ? estimatedStatusBarHeight : 0,
});

const Wrapper = typeof APPROX_STATUSBAR_HEIGHT.statusBarHeight === 'number' ? View : SafeAreaView;

const NavBar = ({ title, next, nextTitle }) => {
  return (
    <Wrapper style={{ margin: 0, backgroundColor: '#00ff00', zIndex: 999 }}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: 'black',
          margin: 0,
        }}
      >
        <View style={{ marginTop: 10 }}>
          <AppHeading title={title} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 10,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <AppButton
            style={{ flex: 1 }}
            title={'zurück'}
            onPress={() => {
              if (navigationRef.canGoBack()) {
                navigationRef.goBack();
              } else {
                navigationRef.navigate('Home');
              }
            }}
          />

          {nextTitle && (
            <>
              <View style={{ width: 20 }}></View>
              <AppButton style={{ flex: 1 }} title={nextTitle} onPress={next} />
            </>
          )}
        </View>
      </View>
    </Wrapper>
  );
};

export default memo(NavBar);
