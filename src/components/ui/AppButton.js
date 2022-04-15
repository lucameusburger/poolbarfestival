import { useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { CLR_PRIMARY } from "../../core/Theme";

const AppButton = ({ onPress, title, color = CLR_PRIMARY, style }) => {
  const [active, setActive] = useState(false);

  return (
    <Pressable
      onPressIn={() => {
        setActive(true);
      }}
      onPressOut={() => {
        setActive(false);
      }}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        { backgroundColor: active ? color : "white" },
        style,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    borderRadius: 12,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
  },
  buttonText: {
    fontFamily: "Helviotopia",
    color: "black",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
  },
});

export default AppButton;
