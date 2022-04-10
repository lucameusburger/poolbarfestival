import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Item, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from './modules/AppButton';
import AppLoading from 'expo-app-loading';
import FadeInView from './modules/FadeInView';
import GeneratorsScreen from './components/GeneratorsScreen';
import ArtistsScreen from './components/ArtistsScreen';
import ArtistScreen from './components/ArtistScreen';
import EventsScreen from './components/EventsScreen';
import EventScreen from './components/EventScreen';
import ScanScreen from './components/ScanScreen';
import StylesMain from './styles/StylesMain';
import PoolbarLogo from './components/PoolbarLogo';
import * as Linking from 'expo-linking';
import TypeWriter from 'react-native-typewriter';

const prefix = Linking.createURL('/');

import { useFonts } from '@expo-google-fonts/outfit';

const HomeScreen = ({ navigation }) => {
  const [typing, setTyping] = useState(1);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ display: 'block', flex: 1, width: '100%', height: '100%' }}>
        <TypeWriter
          style={{ position: 'absolute', width: '200%', left: '-50%', top: '-5%', color: '#2ECDA7', textAlign: 'justify', opacity: 1, fontFamily: 'Helviotopia', letterSpacing: 10, lineHeight: 14, transform: [{ rotate: '12deg' }] }}
          typing={typing}
          minDelay={0.1}
          maxDelay={1}
          onTypingEnd={() => {
            let newTyping = typing >= 1 ? -1 : 1;
            setTyping(newTyping);
          }}
        >
          Vom weiten Rande komm ich her und ich muss sagen es rappelt gar sehr. In Kisten in Häusern in Ländern und Unionen, und trotzdem müssen wir uns alle schonen.Ich bin randvoll und will gern brüllen, gern alle Gedanken der Welt enthüllen. Der Rand, die Grenze ? gezogen als Strich oder in die Nase, wir überschreiten sie manchmal für einen Blick raus aus der Blase. Wir tanzen, balancieren zwischen Zuständen, und Zeiten.Räumlich, politisch, reizen die Weiten. Brechen aus dem Rahmen und
          Strukturen,was hinterlassen wir für Spuren ? Nahtlos der Übergang ohne Rand... durch die Nacht mit der Kippe in der Hand, da lebt sich das Leben besser am Limit mit Bier vom Würstelstand ... am Ende der Stadt- hald am Rand.Auf der Lichtung zwischen Ampeln und Bäumen,-heast so a Gsellschaft-wohnt hinter Zäunen. Der Wegrand ist die weite Ferne,besoffen vom Umbruch, bin ich da gerne. Muss das eng sein, da mitten in der Menge, wenn die Wände den Tellerrand malen, neben stetig wechselden
          Coronazahlen. Da wird der wird Blickwinkel kleiner, der Pyjama immer feiner. Und so "stand ich allein in meinem GartenAlles schien erstarrt in einem WartenAuf die letzten Sommertage dieses JahresUnd mir war es Alles andere als fremd“- Tocotronic/Jenseits des Kanals Vielleicht muss man die Welt neu rändern !Wir sind eh alle SOOO digital, nur 2 Klicks weg vom nächsten Skandal... will eh niemand anecken, höchstens anranden,Hast du den Witz eh verstanden ? OMG LOL AMK Also auf gehts, Rand
          an Rand, jetzt packmas an, jeder und jeder tut was er / sie kann.Noch ein Stück Pizza zur Motivation,den Rand ess ich aber nicht... was bringt mir das schon. Nur Kalorien, die sprengen den Rahmen,lieber noch eine Hand voll nicer Samen. Die sähen wir dann und säumen den Rand mit bunten Flecken.Ich glaub eigentlich da gibts viel zu entdecken. Vom weiten Rande komm ich her und ich muss sagen es rappelt gar sehr. In Kisten in Häusern in Ländern und Unionen, und trotzdem müssen wir uns alle
          schonen.Ich bin randvoll und will gern brüllen, gern alle Gedanken der Welt enthüllen. Der Rand, die Grenze ? gezogen als Strich oder in die Nase, wir überschreiten sie manchmal für einen Blick raus aus der Blase. Wir tanzen, balancieren zwischen Zuständen, und Zeiten.Räumlich, politisch, reizen die Weiten. Brechen aus dem Rahmen und Strukturen,was hinterlassen wir für Spuren ? Nahtlos der Übergang ohne Rand... durch die Nacht mit der Kippe in der Hand, da lebt sich das Leben besser am
          Limit mit Bier vom Würstelstand ... am Ende der Stadt- hald am Rand.Auf der Lichtung zwischen Ampeln und Bäumen,-heast so a Gsellschaft-wohnt hinter Zäunen. Der Wegrand ist die weite Ferne,besoffen vom Umbruch, bin ich da gerne. Muss das eng sein, da mitten in der Menge, wenn die Wände den Tellerrand malen, neben stetig wechselden Coronazahlen. Da wird der wird Blickwinkel kleiner, der Pyjama immer feiner. Und so "stand ich allein in meinem GartenAlles schien erstarrt in einem
          WartenAuf die letzten Sommertage dieses JahresUnd mir war es Alles andere als fremd“- Tocotronic/Jenseits des Kanals Vielleicht muss man die Welt neu rändern !Wir sind eh alle SOOO digital, nur 2 Klicks weg vom nächsten Skandal... will eh niemand anecken, höchstens anranden,Hast du den Witz eh verstanden ? OMG LOL AMK Also auf gehts, Rand an Rand, jetzt packmas an, jeder und jeder tut was er / sie kann.Noch ein Stück Pizza zur Motivation,den Rand ess ich aber nicht... was bringt mir
          das schon. Nur Kalorien, die sprengen den Rahmen,lieber noch eine Hand voll nicer Samen. Die sähen wir dann und säumen den Rand mit bunten Flecken.Ich glaub eigentlich da gibts viel zu entdecken.
        </TypeWriter>
        <View style={{ top: 0, flex: 1, height: '60%' }}>
          <PoolbarLogo style={{ alignSelf: 'center', marginBottom: 'auto', marginTop: 'auto' }} width="80%" height="100%" fill="black" />
        </View>
        <View style={{ top: 0, marginTop: 0, marginBottom: 'auto', height: '40%' }}>
          <AppButton title="events" onPress={() => navigation.navigate('Events')} />
          <View style={{ height: 20 }}></View>
          <AppButton title="artists" onPress={() => navigation.navigate('Artists')} />
          <View style={{ height: 20 }}></View>
          <AppButton title="scan" onPress={() => navigation.navigate('Scan')} />
          <View style={{ height: 20 }}></View>
          <AppButton title="generator" onPress={() => navigation.navigate('Generators')} />
        </View>
      </FadeInView>
      <StatusBar style="auto" />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Helviotopia: require('./assets/fonts/Helviotopia/Helviotopia-Regular.otf'),
    HelviotopiaMedium: require('./assets/fonts/Helviotopia/Helviotopia-Medium.otf'),
    HelviotopiaSemibold: require('./assets/fonts/Helviotopia/Helviotopia-Semibold.otf'),
    HelviotopiaBold: require('./assets/fonts/Helviotopia/Helviotopia-Bold.otf'),
  });

  const linking = {
    prefixes: [prefix],
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome', headerShown: false }} />
          <Stack.Screen name="Events" component={EventsScreen} options={{ title: 'Events', headerShown: false }} />
          <Stack.Screen name="Event" component={EventScreen} options={{ title: 'Event', headerShown: false }} />
          <Stack.Screen name="Artists" component={ArtistsScreen} options={{ title: 'Artists', headerShown: false }} />
          <Stack.Screen name="Artist" component={ArtistScreen} options={{ title: 'Artist', headerShown: false }} />
          <Stack.Screen name="Generators" component={GeneratorsScreen} options={{ title: 'Generator', headerShown: false }} />
          <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
