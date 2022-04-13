import React, { useState, useEffect } from 'react';
import { Dimensions, View, PixelRatio, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { navigationRef } from '../../core/RootNavigation';
import AppHeading from './AppHeading';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const NavBar = ({ title, next, nextTitle, type }) => {
  return (
    <View style={{ width: '100%', top: 0, marginTop: 50 }}>
      <View style={{ marginTop: 0, left: 0, right: 0, width: '100%' }}>
        <AppHeading style={{ width: '100%' }} title={title} />
      </View>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TouchableOpacity
          style={{ width: nextTitle ? '50%' : '100%', paddingTop: 10, paddingBottom: 10, backgroundColor: '#c6c300' }}
          onPress={() => {
            // handle the index we get
            if (navigationRef.canGoBack()) {
              navigationRef.goBack();
            } else {
              navigationRef.navigate('Home');
            }
          }}
        >
          <Text style={styles.button}>zurück</Text>
        </TouchableOpacity>
        {nextTitle && (
          <TouchableOpacity style={{ width: '50%', paddingTop: 10, paddingBottom: 10, backgroundColor: '#c6c300' }} onPress={next}>
            <Text style={styles.button}>{nextTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
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
