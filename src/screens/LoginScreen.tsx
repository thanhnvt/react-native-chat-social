import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  colors,
  defaultColor,
  fontSize,
  primary,
  screenSize,
  space,
  warning,
} from "../theme";

const AppButton = (props: any) => {
  return (
    <View>
      <Pressable style={styles.btnContainer}>{props.children}</Pressable>
    </View>
  );
};

const AppInput = (props: any) => {
  return (
    <View>
      <Text style={styles.inputTitle}>{"User name"}</Text>
      <TextInput {...props} />
    </View>
  );
};

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtApp}>Chat Social App</Text>
      <View style={styles.inputContainer}>
        <AppInput placeholder="Enter userName" style={styles.inputStyle} />
        <AppInput placeholder="Enter password" style={styles.inputStyle} />
        <AppButton>
          <Text style={styles.txtButton}>{"Login"}</Text>
        </AppButton>
        <AppButton>
          <Text style={styles.txtButton}>{"Sign up"}</Text>
        </AppButton>
      </View>
      <Text style={styles.txtLoginWith}>login with</Text>
      <View style={styles.loginSocialContainer}>
        <View
          style={[styles.btnLoginSocial, { backgroundColor: colors.facebook }]}
        >
          <Icon name="facebook" size={20} color={colors.white} />
        </View>
        <View
          style={[styles.btnLoginSocial, { backgroundColor: warning[700] }]}
        >
          <Icon name="google" size={20} color={colors.white} />
        </View>
        <View
          style={[styles.btnLoginSocial, { backgroundColor: colors.black }]}
        >
          <Icon name="apple" size={20} color={colors.white} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background2,
  },
  inputContainer: {
    backgroundColor: colors.white,
    marginHorizontal: space.md,
    width: screenSize.width - space.md * 2,
    borderRadius: space.xs,
    padding: space.md,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowColor: colors.black,
    elevation: 3,
    borderWidth: 1,
    borderColor: defaultColor[200],
    gap: space.md,
  },
  inputStyle: {
    borderRadius: space.xs,
    borderWidth: 1,
    borderColor: defaultColor[200],
    padding: space.md,
  },
  inputTitle: {
    marginBottom: space.xs,
    color: defaultColor[500],
  },
  btnContainer: {
    backgroundColor: primary[500],
    alignItems: "center",
    padding: space.md,
    borderRadius: space.sm,
  },
  txtButton: {
    color: colors.white,
  },
  loginSocialContainer: {
    flexDirection: "row",
    gap: space.md,
    marginTop: space.md,
  },
  btnLoginSocial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  txtLoginWith: {
    color: defaultColor[500],
    marginTop: space.md,
    fontWeight: "500",
  },
  txtApp: {
    marginBottom: space.md * 2,
    fontWeight: "700",
    fontSize: fontSize["4xl"],
    color: warning[500],
  },
});

export default LoginScreen;
