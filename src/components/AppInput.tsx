import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import {
  colors,
  defaultColor,
  fontSize,
  insets,
  primary,
  screenSize,
  space,
} from "../theme";

const AppButton = (props: any) => {
  return (
    <View>
      <Text style={styles.inputTitle}>{"User name"}</Text>
      <TextInput {...props} />
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  inputTitle: {
    marginBottom: space.xs,
    color: defaultColor[500],
  },
});
