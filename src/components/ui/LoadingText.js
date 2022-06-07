import { View, TouchableOpacity, Text } from 'react-native';
import StylesMain from '../../../styles/StylesMain';
import TypeWriter from 'react-native-typewriter';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const LoadingText = ({ onPress, title, type }) => {
  return (
    <View style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
      <TypeWriter style={StylesMain.text} typing={1}>
        laden...
      </TypeWriter>
    </View>
  );
};

export default LoadingText;
