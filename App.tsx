import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AppProvider } from "./Actions/provider";
import Location from "./Components/Location";
import Map from "./Components/Map";

type RootStackParamList = {
  "Location Manager": any;
  Map: {
    latitude: number;
    longitude: number;
  };
};

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          background: "darkgrey",
          border: "white",
          card: "white",
          notification: "white",
          primary: "purple",
          text: "black",
        },
      }}
    >
      <AppProvider>
        <Stack.Navigator initialRouteName="Location Manager">
          <Stack.Screen name="Location Manager" component={Location} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
