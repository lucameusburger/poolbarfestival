import { useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { useRef } from 'react';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import gridImage from '../../../assets/img/grid.png';

const CaptureScreen = ({ navigation, route }) => {
  const viewShotRef = useRef();

  useEffect(() => {
    viewShotRef.current.capture({ format: 'jpg', quality: 80 }).then(async (uri) => {
      await Sharing.shareAsync('file://' + uri);
      navigation.goBack();
    });
  }, []);

  return (
    <ViewShot
      ref={viewShotRef}
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ImageBackground source={gridImage} width="100%" height="100%" style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 'auto', marginBottom: 'auto' }}>{route?.params?.children}</View>
      </ImageBackground>
    </ViewShot>
  );
};

export default CaptureScreen;
