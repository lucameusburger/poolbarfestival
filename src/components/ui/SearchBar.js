import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard } from 'react-native';

const SearchBar = ({ text, setText }) => {
  const [activeClear, setActiveClear] = useState(false);

  return (
    <View style={{ width: '100%', paddingHorizontal: 10, paddingBottom: 10 }}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="suchen ..."
        placeholderTextColor={'#000000'}
        style={{ width: '100%', borderBottomColor: '#000000', borderWidth: 2, minHeight: 10, borderRadius: 12, fontFamily: 'Helviotopia', color: 'black', alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto', fontSize: 18, padding: 10 }}
        onChangeText={setText}
        value={text}
      />
      <Pressable
        onPressIn={() => {
          setActiveClear(true);
        }}
        onPressOut={() => {
          setActiveClear(false);
        }}
        onPress={() => {
          setText('');
          Keyboard.dismiss();
        }}
        style={{
          zIndex: 999999,
          marginBottom: 'auto',
          marginTop: 'auto',
          alignItems: 'center',
          position: 'absolute',
          display: text ? 'flex' : 'none',
          right: 25,
          height: '100%',
        }}
      >
        <FontAwesome5
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            marginBottom: 'auto',
            marginTop: 'auto',
          }}
          name={'times'}
          size={22}
          color={activeClear ? '#00ff00' : '#000000'}
        />
      </Pressable>
    </View>
  );
};

export default SearchBar;
