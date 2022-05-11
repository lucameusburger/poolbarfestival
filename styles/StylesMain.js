import { StyleSheet } from 'react-native';
import { CLR_PRIMARY } from '../src/core/Theme';

const StylesMain = StyleSheet.create({
  text: {
    fontFamily: 'Helviotopia',
    fontSize: 17,
  },
  textSmall: {
    fontFamily: 'Helviotopia',
    fontSize: 14,
  },
  textSmallBold: {
    fontFamily: 'HelviotopiaBold',
    fontSize: 14,
  },
  textBold: {
    fontFamily: 'HelviotopiaBold',
    fontSize: 17,
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
  listDateText: {
    fontFamily: 'HelviotopiaBold',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 14,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  listMainText: {
    fontFamily: 'Helviotopia',
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    fontSize: 22,
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
    backgroundColor: CLR_PRIMARY,
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
    height: 120,
  },
  detailsDateText: {
    fontFamily: 'HelviotopiaBold',
    color: 'black',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  detailsMainText: {
    fontFamily: 'Helviotopia',
    color: '#000',
    alignSelf: 'flex-start',
    fontSize: 36,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});

export default StylesMain;
