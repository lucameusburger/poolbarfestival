import { useState, useEffect, memo } from 'react';
import { Text, View, TouchableOpacity, Button, Dimensions, Animated } from 'react-native';
import { useMemoOne, useCallbackOne } from 'use-memo-one';
import NavBar from '../ui/NavBar';
import LoadingText from '../ui/LoadingText';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import wordlist from '../../../assets/data/wordlist';
import { useDispatch, useSelector } from 'react-redux';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function getWord() {
  return wordlist[Math.floor(Math.random() * wordlist.length)];
}

const FlowtextElement = memo(({ text, y, _key }) => {
  const dispatch = useDispatch();
  const phrase = useSelector(state => state.flowText.phrase);

  const { scrollX } = useMemoOne(() => {
    return {
      scrollX: new Animated.Value(0)
    }
  }, [])

  const removeElement = () => {
    dispatch({
      type: "REMOVE_ELEMENT",
      payload: _key
    })
  }

  const addToPhrase = () => {
    dispatch({
      type: "SET_PHRASE",
      payload: phrase + " " + text
    })
  }

  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: -SCREEN_WIDTH,
      duration: 10000,
      useNativeDriver: true,
    }).start(removeElement);
  }, []);

  return (
    <Animated.View style={{
      position: 'absolute',
      top: y,
      right: 0,
      zIndex: 1000,
      transform: [{ translateX: scrollX }]
    }}>
      <TouchableOpacity
        onPress={() => {
          addToPhrase(text);
          removeElement();
        }}
        style={{
          borderColor: '#000',
          borderWidth: 2,
          padding: 5,
          borderRadius: 50,
          fontFamily: 'HelviotopiaBold'
        }}
      >
        <Text style={StylesMain.flowTextElement}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
})

const FlowtextScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const elements = useSelector(state => state.flowText.elements);
  const phrase = useSelector(state => state.flowText.phrase);
  const [height, setHeight] = useState(0);

  const addElement = element => {
    dispatch({
      type: "ADD_ELEMENT",
      payload: element
    })
  }

  const clear = () => {
    dispatch({
      type: "SET_PHRASE",
      payload: ""
    });
    dispatch({
      type: "SET_ELEMENTS",
      payload: []
    })
  }
  const addToPhrase = (text) => {
    dispatch({
      type: "SET_PHRASE",
      payload: phrase + " " + text
    })
  }


  const add = () => {
    const word = getWord()
    const y = Math.floor(Math.random() * height)
    const key = word + "-" + y


    const newElement = <FlowtextElement
      text={word}
      key={key}
      _key={key}
      y={y}
    />;
    addElement(newElement);
  }

  useEffect(() => {
    if (height) {
      const adder = setInterval(() => {
        add();
      }, 1000);
      return () => clearInterval(adder);
    }
  }, [height])

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          navigation={navigation}
          title="Fließtext"
          next={() => {
            console.log('teilen');
          }}
          nextTitle={'teilen'}
        />
        <Button
          title="clear"
          onPress={clear}
        />
        <Button
          title="Neue Zeile"
          onPress={() => addToPhrase("\n")}
        />
        {(phrase.length > 0) &&
          <Text style={StylesMain.flowTextPhrase}>
            {phrase}
          </Text>}
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            marginBottom: 15,
          }}
          onLayout={(e) => {
            setHeight(e.nativeEvent.layout.height)
          }}
        >
          {elements.map(element => element)}
        </View>
      </FadeInView>
    </View>
  );
};

export default FlowtextScreen;
