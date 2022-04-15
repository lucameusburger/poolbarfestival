import * as geofire from "geofire-common";
import { Dimensions } from "react-native";

export function isLocationInRadius(location, searchPosition, searchRadius) {
  const distanceInKm = geofire.distanceBetween(
    [location.latitude, location.longitude],
    [searchPosition.latitude, searchPosition.longitude]
  );
  const distanceInM = distanceInKm * 1000;
  if (distanceInM <= searchRadius) {
    return true;
  }
  return false;
}

export function moveToRadius(location, radius, mapRef) {
  if (mapRef && mapRef.current) {
    mapRef.current.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        ...calcLatLngDelta(radius),
      },
      1000
    );
  }
}

export function calcLatLngDelta(radius) {
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = Platform.OS === global.platformIOS ? 1.5 : 0.5;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  return {
    latitudeDelta: LATITUDE_DELTA * Number(radius / 15000),
    longitudeDelta: LONGITUDE_DELTA * Number(radius / 15000),
  };
}

// calculates the distance between two coordinates in km
export function distance(lat1, lon1, lat2, lon2) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
}

// calculates the radius of the given viewing region
export function calcRadius(region) {
  const latitudeDistance = distance(
    region.latitude + region.latitudeDelta,
    region.longitude,
    region.latitude - region.latitudeDelta,
    region.longitude,
    "K"
  );
  const longitudeDistance = distance(
    region.latitude,
    region.longitude + region.longitudeDelta,
    region.latitude,
    region.longitude - region.longitudeDelta,
    "K"
  );

  return 250 * Math.max(latitudeDistance, longitudeDistance);
}

// get the zoom level of the given region
export function getZoomLevel(region) {
  return parseInt(
    Math.log2(
      360 * (Dimensions.get("window").width / 256 / region.longitudeDelta)
    ) + 1
  );
}

// set the bounding box of the map to Austria
export function setBoundingAustria(mapRef) {
  const bboxAustria = [
    {
      latitude: 45.922474,
      longitude: 9.150603,
    },
    {
      latitude: 49.103046,
      longitude: 17.518337,
    },
  ];
  setBoundingBox(mapRef, bboxAustria);
}

// set the bounding box of the map to Austria
export function setBoundingBox(mapRef, bbox) {
  mapRef.current.setMapBoundaries(bbox[0], bbox[1]);
}

export function toGeoJson(location) {
  return {
    type: "Feature",
    geometry: {
      coordinates: [location.longitude, location.latitude],
      type: "Point",
    },
    properties: {
      point_count: 0,
      index: location.id,
    },
  };
}
