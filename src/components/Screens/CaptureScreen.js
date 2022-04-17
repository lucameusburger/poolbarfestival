import { useState, useEffect } from 'react';
import { StyleSheet, View, Linking, Dimensions, ImageBackground } from 'react-native';
import FadeInView from '../ui/FadeInView';
import NavBar from '../ui/NavBar';
import StylesMain from '../../../styles/StylesMain';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesome } from '@expo/vector-icons';
import { useRef } from 'react';
import { TabRouter } from '@react-navigation/native';
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
