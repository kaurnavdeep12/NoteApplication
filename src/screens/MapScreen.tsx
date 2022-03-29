import React, {useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
export default function App() {
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const chibaRegion = {
    latitude: 35.6074,
    longitude: 140.1065,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={tokyoRegion}>
        <Polyline
          coordinates={[tokyoRegion, chibaRegion]} //specify our coordinates
          strokeColor={'red'}
          strokeWidth={3}
          lineDashPattern={[1]}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
