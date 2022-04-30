import { Text, View } from "react-native";

import { openGoogleMaps } from "../../core/helpers";
import AppButton from "./AppButton";

const LocationInfoBottomBar = ({ location, ...props }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
        }}
      >
        <AppButton
          title="navigieren"
          textProps={{
            numberOfLines: 1,
          }}
          style={{
            flex: 1,
            marginRight: 10,
          }}
          onPress={() => {
            openGoogleMaps(
              {
                latitude: location.location.coordinates[1],
                longitude: location.location.coordinates[0],
              },
              location.name
            );
          }}
        />
        <AppButton
          title="details"
          textProps={{
            numberOfLines: 1,
          }}
          style={{
            flex: 1,
            marginLeft: 10,
          }}
          onPress={() =>
            navigation.navigate("Raumfahrtprogramm", {
              id: location.id,
            })
          }
        />
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          borderColor: "black",
          width: "100%",
          marginTop: 10,
          height: "100%",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            marginBottom: 0,
            fontFamily: "Helviotopia",
            width: "100%",
          }}
        >
          {location.name}
        </Text>
        <Text
          style={{
            fontFamily: "Helviotopia",
            marginBottom: 0,
            width: "100%",
          }}
        >
          {location.description}
        </Text>
      </View>
    </View>
  );
};

export default LocationInfoBottomBar;
