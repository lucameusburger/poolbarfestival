import React, { useState, useEffect } from 'react';
import { View, Pressable, ImageBackground } from 'react-native';
import FadeInView from '../ui/FadeInView';
import PoolbarLogo from '../ui/PoolbarLogo';
import AppButton from '../ui/AppButton';
import AppCornerButton from '../ui/AppCornerButton';
import StylesMain from '../../../styles/StylesMain';
import gridImage from '../../../assets/img/grid.png';

import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <ImageBackground source={gridImage} width="100%" height="100%" style={{ flex: 1, width: '100%', height: '100%' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View>
              <View style={{ marginBottom: 90, width: '90%', height: '33%', alignSelf: 'center' }}>
                <PoolbarLogo style={{ alignSelf: 'center' }} width="100%" height="100%" fill="black" />
              </View>
              <View style={{ top: 0, marginTop: 0 }}>
                <AppButton title="events" onPress={() => navigation.navigate('Events')} bevelLeft={true} />
                <View style={{ height: 20 }} />
                <AppButton title="artists" onPress={() => navigation.navigate('Artists')} />
                <View style={{ height: 20 }} />
                <AppButton title="generator" onPress={() => navigation.navigate('Generators')} bevelLeft={true} />
                <View style={{ height: 20 }} />
                <AppButton title="fließtext" onPress={() => navigation.navigate('Flowtext')} bevelLeft={false} />
                <View style={{ height: 20 }} />
                <AppButton title="splash" onPress={() => navigation.navigate('SplashScreen')} bevelLeft={false} />
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
