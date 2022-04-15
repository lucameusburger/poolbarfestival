import { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AppButton = ({ onPress, title, color = '#00ff00', style }) => {
  const [active, setActive] = useState(false);

  return (
    <Pressable
      onPressIn={() => {
        setActive(true);
      }}
      onPressOut={() => {
        setActive(false);
      }}
      onPress={onPress}
      style={[styles.buttonContainer, { backgroundColor: active ? color : 'white' }, style]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    fontFamily: 'Helviotopia',
    alignSelf: 'center',
    fontSize: 30,
    borderRadius: 12,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    width: '50%',
  },
  buttonText: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default AppButton;
