import { useState, useEffect } from 'react';
import { StyleSheet, View, Linking, Dimensions } from 'react-native';
import FadeInView from '../ui/FadeInView';
import NavBar from '../ui/NavBar';
import StylesMain from '../../../styles/StylesMain';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesome } from '@expo/vector-icons';
import { navigate } from '../../core/RootNavigation';
import { useDispatch } from 'react-redux';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const dispatch = useDispatch();

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
      const parts = data.split('/');
      const type = parts[parts.length - 2];
      const id = parts[parts.length - 1];
      dispatch({
        type: 'ADD_SCANN',
        payload: {
          id,
          type,
        },
      });
      await Linking.openURL(data);
      setTimeout(() => {
        setScanned(false);
      }, 1000);
    }
  };

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          navigation={navigation}
          title="scan"
          next={() => {
            navigate('ScanCollection');
          }}
          nextTitle={'scans'}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              right: 0,
              zIndex: 99,
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}
          >
            <FontAwesome
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                zIndex: 99,
                opacity: 0.33,
              }}
              name={'qrcode'}
              size={SCREEN_WIDTH}
              color="white"
            />
          </View>
          {hasPermission && <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFillObject, { margin: -20 }]} />}
        </View>
      </FadeInView>
    </View>
  );
};

export default ScanScreen;
