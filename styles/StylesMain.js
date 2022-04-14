import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Item, FlatList } from 'react-native';

const StylesMain = StyleSheet.create({
  text: {
    fontFamily: 'Helviotopia',
    fontSize: 17,
    lineHeight: 20.5,
  },
  mainHeader: {
    //fontFamily: 'Outfit_900Black',
    color: '#000',
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
    color: '#000',
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
    backgroundColor: '#000',
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
    backgroundColor: '#00ff00',
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
    backgroundColor: '#00ff00',
    borderRadius: 12,
    overflow: 'hidden',
  },
  labelContainer: {
    fontFamily: 'Helviotopia',
    fontSize: 30,
    backgroundColor: '#00ff00',
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
  eventListDateText: {
    fontFamily: 'HelviotopiaBold',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 13,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  eventListMainText: {
    fontFamily: 'Helviotopia',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 22,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  generatorListDateText: {
    fontFamily: 'HelviotopiaBold',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 18,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  generatorListMainText: {
    fontFamily: 'Helviotopia',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 32,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  artistListDateText: {
    fontFamily: 'HelviotopiaBold',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 18,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  artistListMainText: {
    fontFamily: 'Helviotopia',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 22,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  artistDetailsDateText: {
    fontFamily: 'HelviotopiaBold',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 22,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  artistDetailsMainText: {
    fontFamily: 'Helviotopia',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 46,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  artistHistory: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 22,
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  flowTextElement: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 18,
    textAlign: 'left',
    textTransform: 'lowercase',
  },
  flowTextPhrase: {
    fontFamily: 'Helviotopia',
    fontWeight: '500',
    color: '#000',
    backgroundColor: '#ffffff',
    fontSize: 33,
    textAlign: 'center',
    textTransform: 'lowercase',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
  },
});

export default StylesMain;
