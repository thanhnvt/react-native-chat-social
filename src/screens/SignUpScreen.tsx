import React, { useState } from "react";
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
import { UserType } from "../types/UserTypes";
import { registerUser } from "../utils/chatUtils";
import { CommonActions } from "@react-navigation/native";
import { ScreensName } from "../constant/screensName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEY } from "../constant/asyncStorageContant";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";

const onViewInfo = () => {
  Linking.canOpenURL("https://github.com/thanhnvt");
};

const SignUpScreen = (props: any) => {
  const [userInfo, updateUserInfo] = useState<any>({});

  const onGoBack = () => {
    props?.navigation?.goBack();
  };

  const onUpdateUserInfo = (value: string, type: string) => {
    userInfo[type] = value;
    updateUserInfo(userInfo);
  };

  const onSignUp = async () => {
    console.log("updateUserInfo", userInfo);
    const _id = new Date().getTime();
    await registerUser(_id + "", { ...userInfo, _id });
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEY.USER_INFORMATION,
      JSON.stringify({ ...userInfo, _id })
    );
    gotoChatScreen();
  };

  const gotoChatScreen = () => {
    props?.navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ScreensName.USERS_SCREEN }],
      })
    );
  };

  return (
    <LinearGradient
      colors={[defaultColor[50], defaultColor[200]]}
      style={styles.container}
    >
      <View style={styles.infoContainer}>
        <Pressable onPress={onViewInfo} style={styles.avatar}>
          <Image
            source={{
              uri: userInfo?.avatar ?? "https://imgur.com/ylPJBm7.png",
            }}
            style={styles.avatar}
          />
        </Pressable>
        <Text style={styles.txtApp}>
          {userInfo?.userName ?? "Chat Social App"}
        </Text>
      </View>
      <ScrollView style={styles.loginView} showsVerticalScrollIndicator={false}>
        <View style={styles.header} />
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <AppInput
              placeholder="Enter avatar"
              title={"Avatar"}
              style={styles.inputStyle}
              onChangeText={(value: string) =>
                onUpdateUserInfo(value, "avatar")
              }
            />
            <AppInput
              placeholder="Enter full name"
              title={"Full name"}
              style={styles.inputStyle}
              onChangeText={(value: string) =>
                onUpdateUserInfo(value, "userName")
              }
            />
            <AppInput
              placeholder="Enter email"
              title={"Email"}
              style={styles.inputStyle}
              keyboardType="email-address"
              onChangeText={(value: string) => onUpdateUserInfo(value, "email")}
            />
            <AppInput
              placeholder="Enter password"
              title={"Password"}
              style={styles.inputStyle}
              onChangeText={(value: string) =>
                onUpdateUserInfo(value, "password")
              }
              secureTextEntry={true}
            />
            <AppButton onPress={onSignUp}>
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
