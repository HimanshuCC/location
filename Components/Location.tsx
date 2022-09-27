import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import GetLocation from "react-native-get-location";
import { AppContext } from "../Actions/provider";
import axios, { AxiosResponse } from "axios";
import UserAvatar from "react-native-user-avatar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface LocationReverse {
  type: string;
  features: [
    {
      type: string;
      properties: {
        datasource: {
          sourcename: string;
          attribution: string;
          license: string;
          url: string;
        };
        name: string;
        housenumber: string;
        street: string;
        suburb: string;
        district: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        country_code: string;
        lon: number;
        lat: number;
        distance: number;
        result_type: string;
        formatted: string;
        address_line1: string;
        address_line2: string;
        category: string;
        timezone: {
          name: string;
          offset_STD: string;
          offset_STD_seconds: number;
          offset_DST: string;
          offset_DST_seconds: number;
          abbreviation_STD: string;
          abbreviation_DST: string;
        };
        rank: {
          popularity: number;
        };
        place_id: string;
      };
      geometry: {
        type: string;
        coordinates: Array<number>;
      };
      bbox: Array<number>;
    }
  ];
}

const Location: React.FC<NativeStackScreenProps<any, "Location Manager">> = (
  props
) => {
  const context = useContext(AppContext);

  const fetchLocationDetails = async (lat: number, lon: number) => {
    const response: AxiosResponse<LocationReverse> = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=34ee94ca7aa148e6af2917579771433c`
    );

    if (response && response.data.features.length) {
      await axios.post(`https://httpstat.us/200`, {
        location_name: response.data.features[0].properties.name,
        time: +new Date(),
      });
      context.addLocation({
        locationName: response.data.features[0].properties.formatted,
        timeAndDate: +new Date(),
        lat,
        lon,
      });
    }
  };

  const [intervalHandler, setIntervalHandler] = useState(0);

  const fetchLocations = () => {
    const intervalNumber = setInterval(async () => {
      const res = await GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 5000,
      });

      await fetchLocationDetails(res.latitude, res.longitude);
    }, 10000);

    setIntervalHandler(intervalNumber);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (context.locations.length >= 30) {
      clearInterval(intervalHandler);
    }
  }, [context.locations]);

  const formatDate = (valueInNumber: number) => {
    const value = new Date(valueInNumber);
    return (
      valueInNumber &&
      `${value.getDate()}/${value.getMonth()}/${value.getFullYear()},${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Location Manager</Text>
      <Text style={styles.subheader}>Current Location</Text>
      <SafeAreaView style={styles.avatar}>
        {context.locations.length ? (
          <>
            <UserAvatar size={25} name="Himanshu Sharma"></UserAvatar>
            <SafeAreaView style={styles.flexView}>
              <Text
                style={{
                  ...styles.marginleft,
                  ...styles.subheader,
                  fontSize: 16,
                }}
              >
                {context.locations[context.locations.length - 1]?.locationName!}
              </Text>
              <Text style={{ marginLeft: 10 }}>
                {formatDate(
                  context.locations[context.locations.length - 1]?.timeAndDate!
                )}
              </Text>
            </SafeAreaView>
          </>
        ) : null}
      </SafeAreaView>
      <Text>Previous Location</Text>
      <FlatList
        data={context.locations}
        renderItem={(item) => {
          return (
            <SafeAreaView style={{ marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Map", {
                    latitude: item.item.lat,
                    longitude: item.item.lon,
                  })
                }
              >
                <SafeAreaView>
                  <Text style={styles.headerText}>
                    {item.item?.locationName!}
                  </Text>
                  <Text style={styles.subheader}>
                    {formatDate(item.item.timeAndDate)}
                  </Text>
                </SafeAreaView>
              </TouchableOpacity>
              <SafeAreaView style={styles.removeBtn}>
                <Button
                  title="Remove"
                  color="grey"
                  onPress={() => {
                    clearInterval(intervalHandler);
                    context.removeLocation(item.index);
                    fetchLocations();
                  }}
                />
              </SafeAreaView>
            </SafeAreaView>
          );
        }}
      ></FlatList>
      <SafeAreaView style={styles.button}>
        <Button
          disabled={context.locations.length < 1}
          title="Clear All"
          onPress={() => {
            context.clearLocation();
            clearInterval(intervalHandler);
            fetchLocations();
          }}
        ></Button>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
  },
  flexView: {
    display: "flex",
    flexDirection: "column",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  marginleft: {
    marginLeft: 10,
  },
  subheader: {
    fontSize: 12,
    marginBottom: 5,
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "100%",
    position: "absolute",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    bottom: 20,
  },
  removeBtn: {
    width: "20%",
    position: "absolute",
    right: 100,
  },
});

export default Location;
