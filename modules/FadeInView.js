import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const FadeInView = ({ children, style, duration = 1000 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={[
        style,
        {
          opacity: fadeAnim, // Bind opacity to animated value
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
