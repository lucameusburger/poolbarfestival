import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import FadeInView from '../ui/FadeInView';
import PoolbarLogo from '../ui/PoolbarLogo';
import AppButton from '../ui/AppButton';
import StylesMain from '../../../styles/StylesMain';
import mapImage from '../../../assets/img/map.png';

import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ top: 0, flex: 1, height: '60%' }}>
            <PoolbarLogo style={{ alignSelf: 'center', marginBottom: 'auto', marginTop: 'auto' }} width="80%" height="100%" fill="black" />
          </View>
          <View style={{ top: 0, marginTop: 0, marginBottom: 'auto', height: '60%' }}>
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

          <TouchableOpacity style={{ position: 'absolute', bottom: 40, left: 40, width: 70, height: 70, backgroundColor: 'transparent', borderRadius: 100 }} onPress={() => navigation.navigate('Map')}>
            <FontAwesome style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', opacity: 0.6 }} name={'map'} size={36} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', bottom: 40, right: 40, width: 70, height: 70, backgroundColor: 'transparent', borderRadius: 100 }} onPress={() => navigation.navigate('Scan')}>
            <FontAwesome style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', opacity: 0.6 }} name={'camera'} size={36} color="#000" />
          </TouchableOpacity>
        </View>
      </FadeInView>
    </View>
  );
};

export default HomeScreen;
