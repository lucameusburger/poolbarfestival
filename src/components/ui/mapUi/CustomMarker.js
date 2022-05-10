import { FontAwesome5 } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';

function CustomMarker({ location, setCurrentLocation, currentLocation, infoBarVisible, setInfoBarVisible, markerIcon }) {
  return (
    <Marker
      key={location.id}
      children={<FontAwesome5 name={markerIcon} color={currentLocation?.id === location.id && infoBarVisible ? '#00ff00' : '#000000'} size={64} backgroundColor={'#ffffff'} />}
      coordinate={{
        longitude: location.location.coordinates[0],
        latitude: location.location.coordinates[1],
      }}
      tracksViewChanges={true}
      onPress={() => {
        setInfoBarVisible(true);
        setCurrentLocation(location);
      }}
    />
  );
}

export default CustomMarker;
