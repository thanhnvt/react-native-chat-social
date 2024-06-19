import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  colors,
  defaultColor,
  fontSize,
  insets,
  primary,
  screenSize,
  space,
  warning,
} from "../theme";
import LinearGradient from "react-native-linear-gradient";

const AppButton = (props: any) => {
  return (
    <View>
      <Pressable style={styles.btnContainer} {...props}>
        {props.children}
      </Pressable>
    </View>
  );
};

const AppInput = (props: any) => {
  const { title } = props;
  return (
    <View>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput {...props} />
    </View>
  );
};

const onViewInfo = () => {
  Linking.canOpenURL("https://github.com/thanhnvt");
};

const SignUpScreen = (props: any) => {
  const onGoBack = () => {
    props?.navigation?.goBack();
  };
  return (
    <LinearGradient
      colors={[defaultColor[50], defaultColor[200]]}
      style={styles.container}
    >
      <View style={styles.infoContainer}>
        <Pressable onPress={onViewInfo} style={styles.avatar}>
          <Image
            source={{ uri: "https://imgur.com/ylPJBm7.png" }}
            style={styles.avatar}
          />
        </Pressable>
        <Text style={styles.txtApp}>Chat Social App</Text>
      </View>
      <ScrollView style={styles.loginView} showsVerticalScrollIndicator={false}>
        <View style={styles.header} />
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <AppInput
              placeholder="Enter avatar"
              title={"Avatar"}
              style={styles.inputStyle}
            />
            <AppInput
              placeholder="Enter email"
              title={"Email"}
              style={styles.inputStyle}
              keyboardType="email-address"
            />
            <AppInput
              placeholder="Enter password"
              title={"Password"}
              style={styles.inputStyle}
            />
            <AppInput
              placeholder="Enter confirm password"
              title={"Confirm password"}
              style={styles.inputStyle}
            />

            <AppButton>
              <Text style={styles.txtButton}>{"Sign up"}</Text>
            </AppButton>
            <AppButton style={styles.btnContainerOutline} onPress={onGoBack}>
              <Text style={styles.txtButtonSignUp}>{"Login"}</Text>
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    height: screenSize.height,
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
    elevation: 4,
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
  btnContainerOutline: {
    backgroundColor: colors.white,
    alignItems: "center",
    padding: space.md,
    borderRadius: space.sm,
    borderWidth: 1,
    borderColor: primary[500],
  },
  txtLoginWith: {
    color: colors.white,
    marginTop: space.md,
    fontWeight: "500",
  },
  txtButtonSignUp: {
    color: primary[500],
    fontWeight: "500",
  },
  txtApp: {
    marginBottom: space.md * 2,
    fontWeight: "700",
    fontSize: fontSize["4xl"],
    color: primary[800],
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: space.md * 2,
  },
  flex: {
    flex: 1,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: insets.top + space.md * 2,
  },
  loginView: {
    position: "absolute",
    zIndex: 1,
    height: screenSize.height,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: screenSize.height / 3,
  },
});

export default SignUpScreen;
