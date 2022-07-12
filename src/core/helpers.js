import { Linking, Platform } from 'react-native';

export function getDateString(date) {
  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekdayName = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];

  return (
    weekdayName[date.getDay()] +
    ' ' +
    date.getDate() +
    ' ' +
    monthName[date.getMonth()] +
    ' ' +
    date.getFullYear()
  );
}

export function openGoogleMaps(location, name) {
  const scheme = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
  });
  const latLng = `${location.latitude},${location.longitude}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${name}@${latLng}`,
    android: `${scheme}${latLng}(${name})`,
  });

  Linking.openURL(url);
}

export function randomId(len) {
  var p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(len)].reduce((a) => a + p[~~(Math.random() * p.length)], '');
}
