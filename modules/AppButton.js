import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title, type }) => {
  //active state
  const [active, setActive] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => {
        setActive(true);
      }}
      onPressOut={() => {
        setActive(false);
      }}
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <Text style={active ? styles.buttonTextActive : styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    fontFamily: 'Helviotopia',
    alignSelf: 'center',
    fontSize: 30,
    backgroundColor: '#2ECDA7',
    borderRadius: 30,
    minWidth: 140,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    alignSelf: 'center',
    marginTop: 'auto',
    fontSize: 24,
    textAlign: 'center',
  },
  buttonTextActive: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    left: -30,
    bottom: -20,
    marginTop: 'auto',
    fontSize: 25,
    textAlign: 'center',
  },
});

export default AppButton;
