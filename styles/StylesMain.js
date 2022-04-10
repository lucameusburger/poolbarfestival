import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Item, FlatList } from 'react-native';

const StylesMain = StyleSheet.create({
  mainHeader: {
    //fontFamily: 'Outfit_900Black',
    color: '#0d1117',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 0,
    fontSize: 30,
    paddingHorizontal: 30,
    fontSize: 44,
  },
  mainView: {
    fontFamily: 'Helviotopia',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    color: '#0d1117',
    width: '100%',
    height: '100%',
  },
  mainHeading: {
    fontFamily: 'Helviotopia',
    fontSize: 120,
    alignSelf: 'center',
  },
  labelMain: {
    fontFamily: 'Helviotopia',
    color: '#fff',
    marginBottom: 10,
    fontSize: 30,
    backgroundColor: '#0d1117',
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: 10,
    padding: 16,
    backgroundColor: '#2ECDA7',
    borderRadius: 26,
  },
  card_header: {
    fontSize: 19,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  badge: {
    color: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  labelContainer: {
    fontFamily: 'Helviotopia',
    fontSize: 30,
    backgroundColor: '#2ECDA7',
    borderRadius: 30,
    minWidth: 140,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 'auto',
    marginBottom: 20,
  },
  labelText: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    alignSelf: 'center',
    marginTop: 'auto',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default StylesMain;
