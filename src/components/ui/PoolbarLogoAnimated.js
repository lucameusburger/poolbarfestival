import React, { useRef, useEffect } from 'react';
import { Animated, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const PoolbarLogo = (props) => {
  const startValue = new Animated.Value(0.9);

  // infinite loop
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(startValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(startValue, {
          toValue: 0.9,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [startValue]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: startValue,
          },
        ],
      }}
    >
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1799.2 805.5" {...props}>
        <Path d="M1692.1 799.2h44.8V422.7h-44.8v376.5zm-212-33.3c-27.4 0-52.7-10.5-52.7-40.1 0-33.2 25.3-43.8 54.8-49 30.1-5.3 63.8-5.8 81.2-18.5v45.9c.1 24.8-24.2 61.7-83.3 61.7m-10 39.6c38 0 71.2-13.2 96-42.2v35.9h74.9v-39.5h-32.7V595.1c0-63.8-53.3-74.9-102.3-74.9-60.6 0-112.8 23.7-115.5 91.2h44.8c2.1-40.1 30.1-51.7 68-51.7 28.5 0 60.6 6.3 60.6 45.4 0 33.7-42.2 30.6-91.8 40.1-46.4 9-92.3 22.1-92.3 83.8.2 54.3 40.8 76.5 90.3 76.5m-216.2-6.3 99.7-272.6h-46.9l-74.4 227.3h-1.1l-76.5-227.3h-50.1l101.2 272.6h48.1zm-236.2 0h44.8V526.5h-44.8v272.7zm64.9-358.1h-84.9v43.8h84.9v-43.8zm-172.5 85.4v-81.7l-44.8 15.3v66.4h-46.4V566h46.4v233.1h99.1v-39.5h-54.3V566.1h54.3v-39.5h-54.3zM611.7 713.2h-44.8c2.6 67.5 54.3 92.3 115.5 92.3 55.4 0 116-21.1 116-86 0-52.7-44.3-67.5-89.1-77.5-41.7-10-89.1-15.3-89.1-47.5 0-27.4 31.1-34.8 58-34.8 29.5 0 60.1 11.1 63.3 45.9h44.8c-3.7-66.4-51.7-85.4-111.8-85.4-47.5 0-101.8 22.7-101.8 77.5 0 52.2 44.8 67 89.1 77 44.8 10 89.1 15.8 89.1 50.6 0 34.3-38 40.6-65.9 40.6-36.9 0-71.7-12.6-73.3-52.7m-277.9-76.4c3.2-41.7 31.1-77 78-77 44.3 0 76.5 34.3 78.6 77H333.8zm83.3 168.7c61.2 0 104.4-32.7 116.5-92.8h-44.3c-7.9 35.3-33.8 53.3-70.7 53.3-59.6 0-86.5-42.2-84.9-89.6h204.1c2.6-65.9-26.9-156.1-123.4-156.1-74.4 0-128.1 60.1-128.1 141.8 2.7 83.3 43.8 143.4 130.8 143.4M5.8 422.7v376.5h50.1V626.7h173v-42.2h-173V464.8h197.2v-42.2H5.8zm1793.4-312H1641v272.6h44.8V152.9h113.4v-42.2zm-367.6 239.4c-27.4 0-52.7-10.5-52.7-40.1 0-33.2 25.3-43.8 54.8-49 30.1-5.3 63.8-5.8 81.2-18.5v45.9c0 24.8-24.2 61.7-83.3 61.7m-10 39.6c38 0 71.2-13.2 96-42.2v35.9h74.9v-39.5h-32.7V179.3c0-63.8-53.3-74.9-102.3-74.9-60.6 0-112.8 23.7-115.5 91.2h44.8c2.1-40.1 30.1-51.7 68-51.7 28.5 0 60.6 6.3 60.6 45.3 0 33.7-42.2 30.6-91.8 40.1-46.4 9-92.3 22.1-92.3 83.8.1 54.4 40.7 76.6 90.3 76.6m-257.3-39.6c-61.7 0-85.9-49.6-85.9-103.4 0-51.1 23.2-102.8 83.3-102.8 58 0 84.4 49.6 84.4 100.7-.1 53.3-20.6 105.5-81.8 105.5m4.7 39.6c83.3 0 124.4-64.9 124.4-141.8s-41.7-143.4-125.5-143.4c-37.4 0-72.2 13.2-87 43.2h-1.1V6.9H1035v376.5h44.8V347h1.1c20.1 32.1 60.2 42.7 88.1 42.7m-249.9-6.3h44.8V6.9h-44.8v376.5zM646.5 247.3c0-66.4 38-103.4 84.9-103.4 46.9 0 84.9 36.9 84.9 103.4 0 65.9-38 102.8-84.9 102.8-47 0-84.9-36.9-84.9-102.8m-47.5 0c0 79.6 45.9 142.4 132.4 142.4s132.4-62.8 132.4-142.4c0-80.2-45.9-142.9-132.4-142.9S599 167.2 599 247.3m-255.2 0c0-66.4 38-103.4 84.9-103.4s84.9 36.9 84.9 103.4c0 65.9-38 102.8-84.9 102.8s-84.9-36.9-84.9-102.8m-47.5 0c0 79.6 45.9 142.4 132.4 142.4s132.4-62.8 132.4-142.4c0-80.2-45.9-142.9-132.4-142.9s-132.4 62.8-132.4 142.9m-167.1-1.6c-61.7 0-86-49.6-86-103.4 0-51.1 23.2-102.8 83.3-102.8 58 0 84.4 49.6 84.4 100.7 0 53.3-20.5 105.5-81.7 105.5M0 383.4h44.8V242.6h1.1c20 32.2 60.1 42.7 88.1 42.7 83.3 0 124.4-64.9 124.4-141.8S216.7 0 132.9 0c-37.4 0-72.2 13.2-87 43.2h-1.1V6.3H0v377.1z" />
      </Svg>
    </Animated.View>
  );
};

export default PoolbarLogo;