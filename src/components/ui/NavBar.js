import React, { useState, useEffect } from 'react';
import { Dimensions, View, PixelRatio, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppHeading from './AppHeading';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const NavBar = ({ title, next, nextTitle, type, navigation }) => {
  return (
    <View style={{ height: 180, width: '100%' }}>
      <View style={{ marginTop: 'auto', left: 0, right: 0, width: '100%' }}>
        <AppHeading style={{ width: '100%' }} title={title} />
      </View>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TouchableOpacity
          style={{ width: '50%', paddingTop: 10, paddingBottom: 10 }}
          onPress={() => {
            navigation.goBack(null);
          }}
        >
          <Text style={styles.button}>zurück</Text>
        </TouchableOpacity>
        {nextTitle && (
          <TouchableOpacity style={{ width: '50%', paddingTop: 10, paddingBottom: 10 }} onPress={next}>
            <Text style={styles.button}>{nextTitle}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ height: 10 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Helviotopia',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default NavBar;
