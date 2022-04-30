import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from "../../../../assets/data/mapStyle.json";
function CustomMap({
  children,
  style,
  onPress,
  onMapReady,
  mapRef,
  initialRegion,
}) {
  console.log(mapStyle);
  return (
    <MapView
      minZoomLevel={7}
      maxZoomLevel={15}
      style={{
        width: "100%",
        height: "100%",
      }}
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle}
      onPress={onPress}
      onMapReady={onMapReady}
      ref={mapRef}
      initialRegion={initialRegion}
      showsPointsOfInterest={false}
      showsIndoors={false}
      pitchEnabled={false}
      toolbarEnabled={false}
      showsCompass={false}
      showsScale={false}
      showsMyLocationButton={false}
    >
      {children}
    </MapView>
  );
}
export default CustomMap;
