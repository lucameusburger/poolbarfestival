import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title, type }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
});

export default AppButton;
