import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ScreensName } from "../constant/screensName";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreensName.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreensName.SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreensName.CHAT_SCREEN}
        component={ChatScreen}
        options={{ headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
