import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Item, FlatList, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FadeInView from '../ui/FadeInView';
import NavBar from '../ui/NavBar';
import StylesMain from '../../../styles/StylesMain';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesome } from '@expo/vector-icons';

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { granted } = await BarCodeScanner.getPermissionsAsync();
      if (!granted) {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const canOpen = await Linking.canOpenURL(data);
    if (canOpen) {
      Linking.openURL(data);
    }
  };

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar navigation={navigation} title="scan" />
        <View style={{ flex: 1, marginBottom: 'auto', marginTop: 'auto' }}>
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, right: 0, zIndex: 99, width: '100%', height: '100%', alignItems: 'center' }}>
            <FontAwesome style={{ marginTop: 'auto', marginBottom: 'auto', zIndex: 99, opacity: 0.33 }} name={'qrcode'} size={700} color="#000" />
          </View>
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
      </FadeInView>
    </View>
  );
};

export default ScanScreen;
