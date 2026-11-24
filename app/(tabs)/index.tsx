// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { StyleSheet, View } from 'react-native';
import Map from '../../components/map/map'


export default function MapScreen() {
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
