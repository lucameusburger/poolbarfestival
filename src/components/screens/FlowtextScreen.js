import { useState, useEffect, useRef, memo } from 'react';
import { Text, View, Pressable, Dimensions, Animated, ScrollView } from 'react-native';
import { useMemoOne } from 'use-memo-one';
import NavBar from '../ui/NavBar';
import FadeInView from '../ui/FadeInView';
import StylesMain from '../../../styles/StylesMain';
import wordlist from '../../../assets/data/wordlist';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../ui/AppButton';
import { navigate } from '../../core/RootNavigation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function getWord() {
  return wordlist[Math.floor(Math.random() * wordlist.length)];
}

const FlowtextElement = memo(({ text, y, _key }) => {
  const dispatch = useDispatch();
  const phrase = useSelector((state) => state.flowText.phrase);
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);

  const { scrollX } = useMemoOne(() => {
    return {
      scrollX: new Animated.Value(SCREEN_WIDTH),
    };
  }, []);

  const removeElement = () => {
    dispatch({
      type: 'REMOVE_ELEMENT',
      payload: _key,
    });
  };

  const addToPhrase = () => {
    dispatch({
      type: 'SET_PHRASE',
      payload: phrase + ' ' + text,
    });
  };

  useEffect(() => {
    if (width !== 0) {
      scrollX.setValue(width);
      Animated.timing(scrollX, {
        toValue: -SCREEN_WIDTH,
        duration: 10000,
        useNativeDriver: true,
      }).start(removeElement);
    }
  }, [width]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: y,
        right: 0,
        zIndex: 1000,
        transform: [{ translateX: scrollX }],
      }}
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
      }}
    >
      <Pressable
        onPressIn={() => {
          setActive(true);
        }}
        onPressOut={() => {
          setActive(false);
        }}
        onPress={() => {
          addToPhrase(text);
          removeElement();
        }}
        style={{
          borderColor: 'black',
          backgroundColor: (active && '#00ff00') || '#ffffff',
          borderWidth: 2,
          padding: 10,
          borderRadius: 50,
          fontFamily: 'HelviotopiaBold',
        }}
      >
        <Text style={StylesMain.flowTextElement}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
});

const FlowtextScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.flowText.elements);
  const phrase = useSelector((state) => state.flowText.phrase);
  const [height, setHeight] = useState(0);
  const scrollViewRef = useRef();

  const addElement = (element) => {
    dispatch({
      type: 'ADD_ELEMENT',
      payload: element,
    });
  };

  const clear = () => {
    dispatch({
      type: 'SET_PHRASE',
      payload: '',
    });
    dispatch({
      type: 'SET_ELEMENTS',
      payload: [],
    });
  };
  const addToPhrase = (text) => {
    dispatch({
      type: 'SET_PHRASE',
      payload: phrase + ' ' + text,
    });
  };

  const add = () => {
    const word = getWord();
    const y = Math.floor(Math.random() * height);
    // make unique key
    const unique = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const key = word + '-' + y + '-' + unique;

    const newElement = <FlowtextElement text={word} key={key} _key={key} y={y} />;
    addElement(newElement);
  };

  useEffect(() => {
    if (height) {
      const adder = setInterval(() => {
        add();
      }, 800);
      return () => clearInterval(adder);
    }
  }, [height]);

  let openShareDialogAsync = async () => {
    if (phrase.length > 0) {
      navigate('Capture', {
        children: (
          <View>
            <View
              style={{
                padding: 5,
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: 'white',
              }}
            >
              <View style={[StylesMain.flowTextContainer, { maxHeight: null, height: null }]}>
                <Text style={[StylesMain.flowTextPhrase, { marginBottom: 0 }]}>{phrase}</Text>
              </View>
            </View>
            <Text style={StylesMain.tag}>#poolbar22</Text>
          </View>
        ),
      });
    }
  };

  return (
    <View style={StylesMain.mainView}>
      <FadeInView style={{ flex: 1, width: '100%', height: '100%' }}>
        <NavBar
          navigation={navigation}
          title="fließtext"
          next={() => {
            openShareDialogAsync();
          }}
          nextTitle={'teilen'}
        />
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            marginBottom: 40,
          }}
          onLayout={(e) => {
            setHeight(e.nativeEvent.layout.height);
          }}
        >
          {elements.map((element) => element)}
        </View>
        <View style={{ margin: 10 }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <AppButton style={{ flex: 1 }} title="neu anfangen" onPress={clear} bevelLeft={false} />
            <View style={{ width: 10 }}></View>
            <AppButton style={{ flex: 1 }} title="umbruch" onPress={() => addToPhrase('\n')} bevelLeft={false} />
          </View>
        </View>
        <View>
          <View
            style={{
              borderTopWidth: 2,
              overflow: 'hidden',
              backgroundColor: 'white',
            }}
          >
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => {
                scrollViewRef.current.scrollToEnd({ animated: true });
              }}
              style={StylesMain.flowTextContainer}
            >
              {phrase ? <Text style={[StylesMain.flowTextPhrase, { marginBottom: 30 }]}>{phrase}</Text> : <Text style={[StylesMain.flowTextPhrase, { margin: 'auto', height: '100%' }]}>fange an wörter anzutippen ...</Text>}
            </ScrollView>
          </View>
        </View>
      </FadeInView>
    </View>
  );
};

export default FlowtextScreen;
