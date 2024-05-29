import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ScreensName } from "../constant/screensName";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreensName.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={ScreensName.CHAT_SCREEN} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
