
import Mapbox, {
  Camera,
  MapView
} from '@rnmapbox/maps';
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
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView style={styles.map}>
          <Camera centerCoordinate={[-75.00597, 40.71427]} zoomLevel={14} />
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
