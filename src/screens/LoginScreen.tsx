import React, { useEffect } from "react";
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
import { ScreensName } from "../constant/screensName";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import { onGoogleButtonPress } from "../utils/loginUtils";
import { UserType } from "../types/UserTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEY } from "../constant/asyncStorageContant";
import firestore from "@react-native-firebase/firestore";
import { CommonActions } from "@react-navigation/native";
import {
  COLLECTION_CHATS_DEMO,
  COLLECTION_USERS,
  DOC_USER,
} from "../constant/chatConstant";
import { registerUser } from "../utils/chatUtils";

const onViewInfo = () => {
  Linking.canOpenURL("https://github.com/thanhnvt");
};

const LoginScreen = (props: any) => {
  const { navigation } = props;

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const userStr = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEY.USER_INFORMATION
    );
    if (userStr) {
      gotoChatScreen();
    }
  };

  const onSignUp = () => {
    navigation?.navigate(ScreensName.SIGN_UP_SCREEN);
  };

  const gotoChatScreen = () => {
    props?.navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ScreensName.USERS_SCREEN }],
      })
    );
  };

  const onLogin = () => {
    gotoChatScreen();
  };

  const loginGoogle = async () => {
    const results = await onGoogleButtonPress();
    if (results?.user) {
      const user: UserType = {
        _id: results?.user?.uid ?? "",
        userName: results?.user.displayName ?? "",
        avatar: results?.user?.photoURL ?? "",
        email: results?.user?.email ?? "",
      };
      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEY.USER_INFORMATION,
        JSON.stringify(user)
      );

      await registerUser(results?.user?.uid ?? "", user);

      gotoChatScreen();
    }
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
              placeholder="Enter userName"
              title={"User name"}
              style={styles.inputStyle}
            />
            <AppInput
              placeholder="Enter password"
              title={"Password"}
              style={styles.inputStyle}
            />
            <AppButton onPress={onLogin}>
              <Text style={styles.txtButton}>{"Login"}</Text>
            </AppButton>
            <AppButton style={styles.btnContainerOutline} onPress={onSignUp}>
              <Text style={styles.txtButtonSignUp}>{"Sign up"}</Text>
            </AppButton>
          </View>
          <Text style={styles.txtLoginWith}>Login with</Text>
          <View style={styles.loginSocialContainer}>
            <Pressable
              style={[
                styles.btnLoginSocial,
                { backgroundColor: colors.facebook },
              ]}
            >
              <Icon name="facebook" size={20} color={colors.white} />
            </Pressable>
            <Pressable
              style={[styles.btnLoginSocial, { backgroundColor: warning[700] }]}
              onPress={loginGoogle}
            >
              <Icon name="google" size={20} color={colors.white} />
            </Pressable>
            <Pressable
              style={[styles.btnLoginSocial, { backgroundColor: colors.black }]}
            >
              <Icon name="apple" size={20} color={colors.white} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: primary[700],
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
    color: primary[700],
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

export default LoginScreen;
