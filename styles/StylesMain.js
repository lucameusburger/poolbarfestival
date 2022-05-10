import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Item, FlatList } from 'react-native';
import { CLR_PRIMARY } from '../src/core/Theme';

const StylesMain = StyleSheet.create({
  text: {
    fontFamily: 'Helviotopia',
    fontSize: 17,
  },
  text: {
    fontFamily: 'Helviotopia',
    fontSize: 12,
  },
  textBold: {
    fontFamily: 'HelviotopiaBold',
    fontSize: 17,
  },
  mainHeader: {
    //fontFamily: 'Outfit_900Black',
    color: 'black',
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
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  mainHeading: {
    fontFamily: 'Helviotopia',
    fontSize: 120,
    alignSelf: 'center',
  },
  labelMain: {
    fontFamily: 'Helviotopia',
    color: 'white',
    marginBottom: 10,
    fontSize: 30,
    backgroundColor: 'black',
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
    backgroundColor: CLR_PRIMARY,
    borderRadius: 26,
  },
  card_header: {
    fontSize: 19,
    marginBottom: 8,
    fontWeight: 'bold',
    color: 'white',
  },
  badge: {
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: CLR_PRIMARY,
    borderRadius: 12,
    overflow: 'hidden',
  },
  labelContainer: {
    fontFamily: 'Helviotopia',
    fontSize: 30,
    backgroundColor: CLR_PRIMARY,
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
    color: 'black',
    alignSelf: 'center',
    marginTop: 'auto',
    fontSize: 24,
    textAlign: 'center',
  },
  eventListDateText: {
    fontFamily: 'HelviotopiaBold',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 13,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  eventListMainText: {
    fontFamily: 'Helviotopia',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 22,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  generatorListDateText: {
    fontFamily: 'HelviotopiaBold',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 18,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  generatorListMainText: {
    fontFamily: 'Helviotopia',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 32,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  artistListDateText: {
    fontFamily: 'HelviotopiaBold',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 14,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  artistListMainText: {
    fontFamily: 'Helviotopia',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 22,
    textAlign: 'left',
    textTransform: 'uppercase',
    lineHeight: 28,
  },
  artistDetailsDateText: {
    fontFamily: 'HelviotopiaBold',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 22,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  artistDetailsMainText: {
    fontFamily: 'Helviotopia',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 46,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  artistHistory: {
    fontFamily: 'Helviotopia',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 22,
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 30,
    lineHeight: 22,
  },
  flowTextElement: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 18,
    textAlign: 'left',
    textTransform: 'lowercase',
  },
  flowTextPhrase: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
    textTransform: 'lowercase',
    marginBottom: 0,
    overflow: 'hidden',
    marginBottom: 10,
  },
  tag: {
    fontFamily: 'HelviotopiaBold',
    fontWeight: '500',
    color: 'black',
    fontSize: 22,
    textAlign: 'left',
    textTransform: 'lowercase',
    color: '#000',
    marginTop: 10,
    backgroundColor: '#00ff00',
    padding: 6,
    width: 140,
  },
  flowTextContainer: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 33,
    textAlign: 'center',
    textTransform: 'lowercase',
    borderRadius: 10,
    padding: 10,
    height: 90,
  },
  eventDateText: {
    fontFamily: 'HelviotopiaBold',
    color: 'black',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  eventMainText: {
    fontFamily: 'Helviotopia',
    color: '#000',
    alignSelf: 'flex-start',
    fontSize: 42,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});

export default StylesMain;
