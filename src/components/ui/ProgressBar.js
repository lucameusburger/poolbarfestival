import React from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable, TouchableOpacity, Animated } from 'react-native';

const ProgressBar = ({ value, maxvalue, text }) => {
  return (
    <View style={{ width: '100%', borderBottomColor: '#000000', borderWidth: 2, minHeight: 10 }}>
      <View style={{ backgroundColor: '#00ff00', width: (100 / maxvalue) * value + '%', alignItems: 'center', minHeight: 6 }}>{!!text && <Text style={{ marginVertical: 5, fontSize: 52 }}>{text}</Text>}</View>
    </View>
  );
};

export default ProgressBar;
