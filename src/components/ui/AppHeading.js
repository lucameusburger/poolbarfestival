import React, { Component, useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, View, Platform, PixelRatio, StyleSheet, Text, ListView } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AppHeading = ({ title }) => {
  const startValue = new Animated.Value(0);
  const endValue = -SCREEN_WIDTH;
  /*
    useEffect(() => {
      Animated.loop(
        Animated.timing(startValue, {
          toValue: endValue,
          duration: 5000,
          // linear
          //easing: Easing.linear,
          useNativeDriver: true,
          duration: 100,
        }),
        { iterations: -1 }
      ).start();
    }, [startValue, endValue]);
    */

  return (
    <Animated.View style={{ display: 'flex', flexDirection: 'row', transform: [{ translateX: startValue }] }}>
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Helviotopia',
    fontSize: SCREEN_WIDTH / 3.5,
    color: '#000',
    alignSelf: 'center',
    marginRight: 100,
  },
});

export default AppHeading;
