import { AutoFocus } from 'expo-camera/build/Camera.types';
import React, { useState, useEffect } from 'react';
import { Dimensions, View, PixelRatio, Text, StyleSheet } from 'react-native';
import AppHeading from '../modules/AppHeading';
import NavBackButton from '../modules/NavBackButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const NavBar = ({ onPress, title, type, navigation }) => {
  return (
    <View style={{ height: 200, width: '100%' }}>
      <View style={{ marginTop: 'auto', marginBottom: 'auto', left: 0, right: 0, width: '100%' }}>
        <AppHeading style={{ width: '50%' }} title={title} />
        <NavBackButton
          style={{ width: '50%' }}
          onPress={() => {
            console.log('back');
            navigation.goBack(null);
          }}
        />
      </View>
    </View>
  );
};

export default NavBar;
