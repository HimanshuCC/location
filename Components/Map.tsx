import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Map: {
    latitude: number;
    longitude: number;
  };
};

const Map: React.FC<NativeStackScreenProps<RootStackParamList, "Map">> = (
  props
) => {
  return (
    <MapView
      testID="Map View"
      provider="google"
      style={styles.map}
      initialRegion={{
        latitude: props.route.params.latitude,
        longitude: props.route.params.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
