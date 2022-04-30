import { Marker } from "react-native-maps";

import markerImage from "../../../../assets/img/marker.png";
import selectedMarkerImage from "../../../../assets/img/selectedMarker.png";

function CustomMarker({
  location,
  setCurrentLocation,
  currentLocation,
  infoBarVisible,
  setInfoBarVisible,
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
    ></Marker>
  );
}

export default CustomMarker;
