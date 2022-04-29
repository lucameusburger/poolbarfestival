import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { CLR_PRIMARY } from '../../core/Theme';

const AppCornerButton = ({ onPress, icon, color = CLR_PRIMARY, style, position = 'lb' }) => {
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
          left: position == 'lb' ? '6%' : 'auto',
          right: position == 'rb' ? '6%' : 'auto',
        },
        style,
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
    bottom: '5%',
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
