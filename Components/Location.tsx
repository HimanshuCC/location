import React, { useContext, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import GetLocation from "react-native-get-location";
import { AppContext } from "../Actions/provider";

const Location = () => {
  const context = useContext(AppContext);
  const fetchLocations = () => {
    setTimeout(async () => {
      const res = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
      });

      console.log(res);
    }, 500);
  };
  useEffect(() => {
    fetchLocations();
  }, []);
  return (
    <SafeAreaView>
      <Text>Locations</Text>
      {/* <Button title="+" onPress={context.handleIncrement} />
      <Button title="-" onPress={context.handleDecrement} /> */}
    </SafeAreaView>
  );
};

export default Location;
