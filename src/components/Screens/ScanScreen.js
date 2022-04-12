import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FadeInView from '../ui/FadeInView';
import NavBar from '../ui/NavBar';
import StylesMain from '../../../styles/StylesMain';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const canOpen = await Linking.canOpenURL(data);
    if (canOpen) {
      Linking.openURL(data);
    }
  };

  if (hasPermission === null) {
    alert('Requesting for camera permission');
  }
  if (hasPermission === false) {
    alert('No access to camera');
  }

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="scan" />
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>

      </FadeInView>
    </View>
  );
};

export default ScanScreen;
