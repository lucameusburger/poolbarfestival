import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, PixelRatio, Text, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AppHeading = ({ title }) => {
  return (
    <Text numberOfLines={1} style={styles.heading}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Helviotopia',
    fontSize: SCREEN_WIDTH / 3.5,
    color: '#000',
    alignSelf: 'center',
  },
});

export default AppHeading;
