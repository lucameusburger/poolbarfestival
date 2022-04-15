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
    <Wrapper style={{ marginBottom: 0 }}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#fff',
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

export default memo(NavBar);
