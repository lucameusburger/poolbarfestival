import { useEffect, useState } from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { useRef } from 'react';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import gridImage from '../../../assets/img/grid.png';

const CaptureScreen = ({ navigation, route }) => {
  const [imageSet, setImageSet] = useState(false);
  const viewShotRef = useRef();

  useEffect(() => {
    if (imageSet) {
      viewShotRef.current.capture({ format: 'jpg', quality: 1 }).then(async (uri) => {
        await Sharing.shareAsync('file://' + uri);
        navigation.goBack();
      });
    }
  }, [imageSet]);

  return (
    <ScrollView>
      <ViewShot
        options={{ format: 'jpg', quality: 1 }}
        ref={viewShotRef}
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          minHeight: '100%',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageBackground
          source={gridImage}
          width="100%"
          height="100%"
          style={{ flex: 1, width: '100%', height: '100%' }}
          onLoad={() => {
            setImageSet(true);
          }}
        >
          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 'auto', marginBottom: 'auto' }}>{route?.params?.children}</View>
        </ImageBackground>
      </ViewShot>
    </ScrollView>
  );
};

export default CaptureScreen;
