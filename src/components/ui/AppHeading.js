import React, { useEffect, memo } from 'react';
import { Animated, Dimensions, View, StyleSheet, Text } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AppHeading = ({ title, slide = true }) => {
  const duration = 5000;
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

  return slide ? (
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Animated.View
        style={{
          display: 'flex',
          flexDirection: 'row',
          transform: [{ translateX: startValue }],
        }}
      >
        <Text numberOfLines={1} style={styles.heading}>
          {title}
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          transform: [{ translateX: startValue0 }],
        }}
      >
        <Text numberOfLines={1} style={styles.heading}>
          {title}
        </Text>
      </Animated.View>
    </View>
  ) : (
    <View>
      <Text numberOfLines={1} style={styles.heading}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Helviotopia',
    fontSize: SCREEN_HEIGHT / 12,
    color: 'black',
    alignSelf: 'center',
  },
});

export default memo(AppHeading);
