import React, { useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, ImageBackground, Image, TouchableOpacity, Button, Dimensions, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import { fetchArtists } from '../../redux/artistsThunk';
import { navigate } from '../../core/RootNavigation';
import PoolbarImage from '../ui/PoolbarImage';
import artistPlaceholder from '../../../assets/img/artistPlaceholder.jpg';
import { fetchEvents } from '../../redux/eventsThunk';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FlowtextGame = ({ elements, addToPhrase }) => {
  return (
    <View style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', margin: 0 }}>
      {elements.map((element, index) => {
        return <FlowtextElement addToPhrase={addToPhrase} key={index} text={element} />;
      })}
    </View>
  );
};

const FlowtextElement = ({ index, text, addToPhrase }) => {
  // make random y position between 0 and SCREEN_HEIGHT
  const [y, setY] = useState(Math.floor(Math.random() * SCREEN_HEIGHT));

  const fadeAnim = useRef(new Animated.Value(6)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: -SCREEN_WIDTH,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ position: 'absolute', top: y, right: 0, transform: [{ translateX: fadeAnim }] }}>
      <TouchableOpacity
        key={index}
        onPress={() => {
          addToPhrase(text);
        }}
        style={{ borderColor: '#000', borderWidth: 2, padding: 10, borderRadius: 50, fontFamily: 'HelviotopiaBold' }}
      >
        <Text style={StylesMain.flowTextElement}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const FlowtextScreen = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [flowtexts, setFlowtexts] = useState(['Rand', 'ist', 'cool']);
  const [flowtextElements, setFlowtextElements] = useState([]);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const newFlowtextElements = [...flowtextElements];
      const text = flowtexts[Math.floor(Math.random() * flowtexts.length)];
      newFlowtextElements.push(text);
      console.log(newFlowtextElements);
      setFlowtextElements(newFlowtextElements);
    }, 1000);
  }, [flowtextElements]);

  const addToPhrase = (text) => {
    setPhrase(phrase + ' ' + text);
    // setFlowtextElements(flowtextElements.filter((e) => e !== text));
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
        <Button
          title="add"
          onPress={() => {
            // add FlowTextElement to flowtextElements
            const newFlowtextElements = [...flowtextElements];
            const text = flowtexts[Math.floor(Math.random() * flowtexts.length)];
            newFlowtextElements.push(text);
            setFlowtextElements(newFlowtextElements);
          }}
        />
        <Text style={StylesMain.flowTextPhrase}>{phrase}</Text>
        <View style={{ flex: 1 }}>{!isLoaded ? <LoadingText /> : flowtexts ? <FlowtextGame addToPhrase={addToPhrase} elements={flowtextElements} /> : <LoadingText />}</View>
      </FadeInView>
    </View>
  );
};

export default FlowtextScreen;
