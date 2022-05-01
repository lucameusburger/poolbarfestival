import React from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable, TouchableOpacity, Animated } from 'react-native';

const ProgressBar = ({ value, maxvalue }) => {
  return (
    <View style={{ width: '100%', borderBottomColor: '#000000', borderWidth: 2, height: 10 }}>
      <View style={{ backgroundColor: '#00ff00', width: (100 / maxvalue) * value + '%', height: '100%' }}></View>
    </View>
  );
};

export default ProgressBar;
