import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, PixelRatio, Text, StyleSheet, TouchableOpacity } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const NavBackButton = ({ onPress, title, type }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Helviotopia',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default NavBackButton;
