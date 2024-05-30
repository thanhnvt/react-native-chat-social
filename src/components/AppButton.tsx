import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { colors, defaultColor, fontSize, insets, primary, screenSize, space } from "../theme";

const AppButton = (props: any) => {
  return (
    <View>
      <Pressable style={styles.btnContainer} {...props}>
        {props.children}
      </Pressable>
    </View>
  );
};

export default AppButton


const styles = StyleSheet.create({
    btnContainer: {
      backgroundColor: primary[500],
      alignItems: "center",
      padding: space.md,
      borderRadius: space.sm,
    }
  });
