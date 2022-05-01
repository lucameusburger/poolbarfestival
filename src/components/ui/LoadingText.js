import { View, TouchableOpacity, Text } from 'react-native';
import StylesMain from '../../../styles/StylesMain';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const LoadingText = ({ onPress, title, type }) => {
  return (
    <View style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
      <Text style={StylesMain.text}>laden...</Text>
    </View>
  );
};

export default LoadingText;
