import { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// from assets/svg/

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title, color = '#FFC23B', style }) => {
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
      style={[
        styles.buttonContainer,
        { backgroundColor: active ? color : 'white' },
        style
      ]}
    >
      <Text
        style={styles.buttonText}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    fontFamily: 'Helviotopia',
    alignSelf: 'center',
    fontSize: 30,
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 3,
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
