import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from '../../../../assets/data/mapStyle.json';
function CustomMap({ children, style, onPress, onMapReady, mapRef, initialRegion }) {
  return (
    <MapView
      minZoomLevel={5}
      maxZoomLevel={30}
      style={[
        {
          width: '100%',
          height: '100%',
          position: 'absolute',
          bottom: 0,
          top: 0,
        },
        style,
      ]}
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle}
      onPress={onPress}
      onMapReady={onMapReady}
      ref={mapRef}
      initialRegion={initialRegion}
      showsPointsOfInterest={false}
      showsIndoors={false}
      pitchEnabled={true}
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
