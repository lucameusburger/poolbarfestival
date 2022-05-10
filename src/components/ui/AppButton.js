import { useState, useEffect } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { CLR_PRIMARY } from '../../core/Theme';
import { Audio } from 'expo-av';

const AppButton = ({ onPress, title, color = CLR_PRIMARY, style, textStyle, textProps }) => {
  const [active, setActive] = useState(false);
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../../../assets/sound/button.mp3'));
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Pressable
      onPressIn={() => {
        // playSound();
        setActive(true);
      }}
      onPressOut={() => {
        setActive(false);
      }}
      onPress={onPress}
      style={[styles.buttonContainer, { backgroundColor: active ? color : 'white' }, style]}
    >
      <Text {...textProps} style={[styles.buttonText, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    borderRadius: 12,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
  },
  buttonText: {
    fontFamily: 'Helviotopia',
    color: 'black',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default AppButton;
