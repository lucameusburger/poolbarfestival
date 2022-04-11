import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, PixelRatio, Text, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AppHeading = ({ onPress, title, type }) => {
  return (
    <Text numberOfLines={1} style={styles.heading}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Helviotopia',
    fontSize: SCREEN_WIDTH / 6,
    color: '#2ECDA7',
    alignSelf: 'center',
  },
});

export default AppHeading;
