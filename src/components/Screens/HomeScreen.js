import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import FadeInView from '../ui/FadeInView';
import PoolbarLogo from '../ui/PoolbarLogo';
import AppButton from '../ui/AppButton';
import StylesMain from '../../../styles/StylesMain';
import mapImage from '../../../assets/img/map.png';

import TypeWriter from 'react-native-typewriter';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [typing, setTyping] = useState(1);

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <ImageBackground resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }} blurRadius={30} source={mapImage}>
          {/* <TypeWriter
            style={{ position: 'absolute', width: '200%', left: '-50%', top: '-5%', color: '#FFC23B', textAlign: 'justify', opacity: 1, fontFamily: 'Helviotopia', letterSpacing: 10, lineHeight: 14, transform: [{ rotate: '12deg' }] }}
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
          </TypeWriter> */}
          <View style={{ top: 0, flex: 1, height: '60%' }}>
            <PoolbarLogo style={{ alignSelf: 'center', marginBottom: 'auto', marginTop: 'auto' }} width="80%" height="100%" fill="black" />
          </View>
          <View style={{ top: 0, marginTop: 0, marginBottom: 'auto', height: '60%' }}>
            <AppButton
              title="events"
              onPress={() => navigation.navigate('Events')}
              bevelLeft={true}
            />
            <View style={{ height: 20 }} />
            <AppButton title="artists" onPress={() => navigation.navigate('Artists')} />
            <View style={{ height: 20 }} />
            <AppButton
              title="generator"
              onPress={() => navigation.navigate('Generators')}
              bevelLeft={true}
            />
            <View style={{ height: 20 }} />

            <AppButton
              title="fliestext"
              onPress={() => navigation.navigate('Fliestext')}
              bevelLeft={false}
            />
          </View>

          <TouchableOpacity
            style={{ position: 'absolute', bottom: 40, left: 40, width: 70, height: 70, backgroundColor: 'transparent', borderRadius: 100 }}
            onPress={() => navigation.navigate('Map')}
          >
            <FontAwesome
              style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', opacity: 0.6 }}
              name={'map'}
              size={36}
              color="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 40, right: 40, width: 70, height: 70, backgroundColor: 'transparent', borderRadius: 100 }}
            onPress={() => navigation.navigate('Scan')}
          >
            <FontAwesome
              style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center', opacity: 0.6 }}
              name={'camera'}
              size={36}
              color="#000"
            />
          </TouchableOpacity>
        </ImageBackground>
      </FadeInView>
    </View>
  );
};

export default HomeScreen;
