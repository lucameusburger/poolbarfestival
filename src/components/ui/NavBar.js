import { AutoFocus } from 'expo-camera/build/Camera.types';
import React, { useState, useEffect } from 'react';
import { Dimensions, View, PixelRatio, Text, StyleSheet } from 'react-native';
import AppHeading from './AppHeading';
import NavBackButton from './NavBackButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const NavBar = ({ onPress, title, type, navigation }) => {
  return (
    <View style={{ height: 180, width: '100%' }}>
      <View style={{ marginTop: 'auto', left: 0, right: 0, width: '100%' }}>
        <AppHeading style={{ width: '50%' }} title={title} />
      </View>
      <View style={{ height: 10 }}></View>
      <NavBackButton
        style={{ width: '50%' }}
        onPress={() => {
          console.log('back');
          navigation.goBack(null);
        }}
      />
      <View style={{ height: 20 }}></View>
    </View>
  );
};

export default NavBar;
