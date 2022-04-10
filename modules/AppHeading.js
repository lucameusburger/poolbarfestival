import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, PixelRatio, Text, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;

const AppButton = ({ onPress, title, type }) => {
  return <Text style={styles.heading}>{title}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Helviotopia',
    fontSize: SCREEN_WIDTH / 10,
    alignSelf: 'center',
  },
});

export default AppButton;
