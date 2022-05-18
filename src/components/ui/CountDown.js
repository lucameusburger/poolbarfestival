import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, View, StyleSheet, Text } from 'react-native';
import StylesMain from '../../../styles/StylesMain';

const CountDown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // interval every second
  useEffect(() => {
    const interval = setInterval(() => {
      //const timer = new Date('2022-07-07T16:00:00').getTime();
      const timer = new Date('2022-07-07T16:00:00').getTime();
      const now = new Date().getTime();
      const diff = timer - now;

      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      {days + hours + minutes + seconds > 0 ? (
        <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
          <View>
            <Text style={StylesMain.textBold}>noch {days}d </Text>
          </View>
          <View>
            <Text style={StylesMain.textBold}>{hours}h </Text>
          </View>
          <View>
            <Text style={StylesMain.textBold}>{minutes}m </Text>
          </View>
          <View>
            <Text style={StylesMain.textBold}>{seconds}s</Text>
          </View>
        </View>
      ) : (
        <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={StylesMain.textBold}>findet jetzt statt</Text>
        </View>
      )}
    </View>
  );
};

export default CountDown;
