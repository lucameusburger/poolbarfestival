import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const AppCornerButton = ({ onPress, icon, color = '#00ff00', style, position = 'lb' }) => {
  const [active, setActive] = useState(false);

  return (
    <Pressable
      onPressIn={() => {
        setActive(true);
      }}
      onPressOut={() => {
        setActive(false);
      }}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: active ? color : 'white',
          left: position == 'lb' ? 40 : 'auto',
          right: position == 'rb' ? 40 : 'auto'
        },
        style
      ]}
      onPress={onPress}
    >
      <FontAwesome style={styles.buttonIcon} name={icon} size={36} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'center',
    opacity: 1,
  },
});

export default AppCornerButton;
