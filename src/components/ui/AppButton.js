import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// from assets/svg/

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title, bevelLeft = false, style }) => {
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
      style={[styles.buttonContainer, style]}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={168.204}
        height={49.23}
      >
        {!bevelLeft ?
          <Path
            data-name="Path 5"
            d="M24.615 0a24.615 24.615 0 0 0 0 49.23h114.428a24.615 24.615 0 0 0 24.615-24.615Z"
            fill="rgba(198,195,0,0.99)"
          /> :
          <Path
            data-name="Path 6"
            d="M143.589 0a24.615 24.615 0 0 1 0 49.23H24.615A24.615 24.615 0 0 1 0 24.615Z"
            fill="rgba(198,195,0,0.99)"
          />
        }

        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.buttonText,
              active ?
                {
                  transform: [
                    {
                      translateX: active ? 10 * (bevelLeft ? -1 : 1) : 0,
                    },
                    {
                      translateY: active ? -25 : 0,
                    },
                    {
                      rotate: active ? (bevelLeft ? '-' : '+') + '10deg' : '0deg',
                    },

                  ],
                } :
                null,
            ]}>
            {title}
          </Animated.Text>
        </View>

      </Svg>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    fontFamily: 'Helviotopia',
    alignSelf: 'center',
    fontSize: 30,
    borderRadius: 30,
    textAlign: 'center',
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
  textContainer: {
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AppButton;
