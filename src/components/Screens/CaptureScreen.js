import { useState, useEffect } from "react";
import { StyleSheet, View, Linking, Dimensions } from "react-native";
import FadeInView from "../ui/FadeInView";
import NavBar from "../ui/NavBar";
import StylesMain from "../../../styles/StylesMain";
import { BarCodeScanner } from "expo-barcode-scanner";
import { FontAwesome } from "@expo/vector-icons";
import { useRef } from "react";
import { TabRouter } from "@react-navigation/native";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const CaptureScreen = ({ navigation, route }) => {
  const viewShotRef = useRef();

  useEffect(() => {
    viewShotRef.current
      .capture({ format: "jpg", quality: 80 })
      .then(async (uri) => {
        await Sharing.shareAsync("file://" + uri);
        navigation.goBack();
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ViewShot
        ref={viewShotRef}
        style={{
          backgroundColor: "transparent",
        }}
      >
        {route?.params?.children}
      </ViewShot>
    </View>
  );
};

export default CaptureScreen;
