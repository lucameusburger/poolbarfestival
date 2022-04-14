import React, { Component, useState, useEffect, useRef, memo } from 'react';
import { Animated, Dimensions, View, Platform, PixelRatio, StyleSheet, Text, ListView } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AppHeading = ({ title }) => {
  const duration = 10000;
  const startValue = new Animated.Value(SCREEN_WIDTH);
  const startValue0 = new Animated.Value(SCREEN_WIDTH);
  const endValue = -SCREEN_WIDTH;

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.timing(startValue, {
          toValue: endValue,
          duration: duration,
          useNativeDriver: true,
          // linear easing function
          easing: (t) => t,
        }),
        { iterations: -1 }
      ),
      Animated.loop(
        Animated.timing(startValue0, {
          toValue: endValue,
          duration: duration,
          useNativeDriver: true,
          delay: duration / 2,
          easing: (t) => t,
        }),
        { iterations: -1 }
      ),
    ]).start();
  }, [startValue, endValue]);

  return (
    <View style={{ flexDirection: 'row', height: 220 }}>
      <Animated.View style={{ position: 'absolute', display: 'flex', flexDirection: 'row', transform: [{ translateX: startValue }] }}>
        <Text numberOfLines={1} style={styles.heading}>
          {title}
        </Text>
      </Animated.View>
      <Animated.View style={{ position: 'absolute', display: 'flex', flexDirection: 'row', transform: [{ translateX: startValue0 }] }}>
        <Text numberOfLines={1} style={styles.heading}>
          {title}
        </Text>
      </Animated.View>
    </View>
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

export default memo(AppHeading);
