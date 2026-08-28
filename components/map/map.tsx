import Mapbox, { Camera, LocationPuck, MapView, UserLocation, type Location } from '@rnmapbox/maps';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

const token = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

if (token === undefined || !token) {
  throw new Error(
    'Missing EXPO_PUBLIC_MAPBOX_TOKEN. Check your .env.local file.'
  );
}

Mapbox.setAccessToken(token);
Mapbox.setTelemetryEnabled(false);

export default function Map() {
  const [location, setLocation] = useState<Location | null>(null);

  // const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // useEffect(() => {
  //   async function getCurrentLocation() {

  //     let { status } = await Location.requestBackgroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   }

  //   getCurrentLocation();
  // }, []);

  return (
    <MapView
      style={styles.map}
      attributionEnabled={false}
      logoEnabled={false}
      compassEnabled={true}
      compassViewPosition={1}
    >
      <UserLocation
        onUpdate={(newLocation) => setLocation(newLocation)}
        minDisplacement={10}
      />
      <Camera
        centerCoordinate={[location?.coords.longitude ?? 0, location?.coords.latitude ?? 0]}
        zoomLevel={14}
        animationMode='moveTo'
      />
      <LocationPuck
        puckBearing='heading'
        puckBearingEnabled={true}
        topImage="userLocation"
        visible={true}
        scale={['interpolate', ['linear'], ['zoom'], 10, 1.0, 20, 4.0]}
        pulsing={{
          isEnabled: true,
          color: 'teal',
          radius: 75.0,
        }}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});