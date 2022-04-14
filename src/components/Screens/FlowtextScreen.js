import { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Button, Dimensions, Animated } from 'react-native';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import wordlist from '../../../assets/data/wordlist';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function getWord() {
  return wordlist[Math.floor(Math.random() * wordlist.length)];
}

const FlowtextElement = ({ index, text, addToPhrase, delWord }) => {
  const y = Math.floor(Math.random() * SCREEN_HEIGHT)

  const fadeAnim = useRef(new Animated.Value(6)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: -SCREEN_WIDTH,
      duration: 10000,
      useNativeDriver: true,
    }).start(delWord(text));
  }, [fadeAnim]);

  return (
    <Animated.View style={{ position: 'absolute', top: y, right: 0, transform: [{ translateX: fadeAnim }] }}>
      <TouchableOpacity
        key={index}
        onPress={() => {
          addToPhrase(text);
          delWord(text);
        }}
        style={{ borderColor: '#000', borderWidth: 2, padding: 10, borderRadius: 50, fontFamily: 'HelviotopiaBold' }}
      >
        <Text style={StylesMain.flowTextElement}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const FlowtextScreen = ({ navigation }) => {
  const [flowtextElements, setFlowtextElements] = useState([]);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFlowtextElements([...flowtextElements, getWord()]);
    }, 1000);
  }, [flowtextElements]);

  const addToPhrase = (text) => {
    setPhrase(phrase + ' ' + text);
  };

  const delWord = (text) => {
    setFlowtextElements(flowtextElements.filter((e) => e !== text));
  };

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          navigation={navigation}
          title="artists"
          next={() => {
            console.log('teilen');
          }}
          nextTitle={'teilen'}
        />
        <Button
          title="clear"
          onPress={() => {
            setPhrase('');
            setFlowtextElements([]);
          }}
        />
        <Text style={StylesMain.flowTextPhrase}>{phrase}</Text>
        <View style={{ flex: 1 }}>
          <View style={{ width: '100%', height: '100%', position: 'absolute', margin: 0 }}>
            {flowtextElements.map((element, index) => {
              return <FlowtextElement addToPhrase={addToPhrase} key={index} text={element} delWord={delWord} />;
            })}
          </View>
        </View>
      </FadeInView>
    </View>
  );
};

export default FlowtextScreen;
