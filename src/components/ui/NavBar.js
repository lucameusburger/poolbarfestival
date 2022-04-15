import { View, StyleSheet, Platform, NativeModules } from 'react-native';
import { navigationRef } from '../../core/RootNavigation';
import AppHeading from './AppHeading';
import AppButton from './AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { memo, useEffect } from 'react';
import { useRef } from 'react';

const estimatedStatusBarHeight = NativeModules.NativeUnimoduleProxy?.modulesConstants?.ExponentConstants?.statusBarHeight ?? 0;

const APPROX_STATUSBAR_HEIGHT = Platform.select({
  android: estimatedStatusBarHeight,
  ios: Platform.Version < 11 ? estimatedStatusBarHeight : 0,
});

const Wrapper = typeof APPROX_STATUSBAR_HEIGHT.statusBarHeight === 'number' ? View : SafeAreaView;

const NavBar = ({ title, next, nextTitle }) => {
  return (
    <Wrapper style={{ margin: 0, backgroundColor: 'transparent', zIndex: 999 }}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          top: 0,
          borderBottomWidth: 2,
          borderBottomColor: '#000',
          marginBottom: 0,
        }}
      >
        <AppHeading title={title} />
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
