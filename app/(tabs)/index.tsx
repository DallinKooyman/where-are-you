import Mapbox, { Camera, Image, Images, MapView, UserTrackingMode, LocationPuck } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const token = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

if (token === undefined || !token) {
  throw new Error(
    'Missing EXPO_PUBLIC_MAPBOX_TOKEN. Check your .env.local file.'
  );
}

Mapbox.setAccessToken(token);
Mapbox.setTelemetryEnabled(false);


export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView style={styles.map}>
          <Camera
            centerCoordinate={[location?.coords.longitude ?? 0, location?.coords.latitude ?? 0]}
            zoomLevel={14}
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
      </View>
    </View>
  );
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
