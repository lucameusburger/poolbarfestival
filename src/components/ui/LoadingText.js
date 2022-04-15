import { View, TouchableOpacity, Text } from 'react-native';
import StylesMain from '../../../styles/StylesMain';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const LoadingText = ({ onPress, title, type }) => {
  return (
    <View style={StylesMain.labelContainer}>
      <Text style={StylesMain.labelText}>laden...</Text>
    </View>
  );
};

export default LoadingText;
