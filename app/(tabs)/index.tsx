
import { StyleSheet, View } from 'react-native';
import Map from '../../components/map/map'


export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Map />
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
