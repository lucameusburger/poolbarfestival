import { Marker } from "react-native-maps";

function CustomMarker({
  location,
  setCurrentLocation,
  currentLocation,
  infoBarVisible,
  setInfoBarVisible,
  markerImage,
  selectedMarkerImage,
}) {
  return (
    <Marker
      key={location.id}
      image={
        currentLocation?.id === location.id && infoBarVisible
          ? selectedMarkerImage
          : markerImage
      }
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
