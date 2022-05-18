import { FontAwesome5 } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';

function CustomMarker({ location, iconColor, onPress, markerIcon }) {
  return (
    <Marker
      key={location.id}
      children={
        <FontAwesome5
          name={markerIcon}
          color={iconColor}
          size={64}
          backgroundColor={'#ffffff'}
        />
      }
      coordinate={{
        longitude: location.location.coordinates[0],
        latitude: location.location.coordinates[1],
      }}
      tracksViewChanges={true}
      onPress={onPress}
    />
  );
}

export default CustomMarker;
