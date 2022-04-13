import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title, type, icon, style }) => {
  //active state
  const [active, setActive] = useState(false);

  const CLR_PRIMARY = useSelector((state) => state.theme.CLR_PRIMARY);

  return (
    <TouchableOpacity
      onPressIn={() => {
        setActive(true);
      }}
      onPressOut={() => {
        setActive(false);
      }}
      onPress={onPress}
      style={[styles.buttonContainer, style]}
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
    backgroundColor: '#FFC23B',
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
    marginBottom: 'auto',
    fontSize: 24,
    textAlign: 'center',
    alignSelf: 'center',
  },
  buttonTextActive: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    left: -30,
    bottom: -20,
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 25,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default AppButton;
