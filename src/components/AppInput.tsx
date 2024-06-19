import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { defaultColor, space } from "../theme";
const AppInput = (props: any) => {
  const { title } = props;
  return (
    <View>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput {...props} />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputTitle: {
    marginBottom: space.xs,
    color: defaultColor[500],
  },
});
