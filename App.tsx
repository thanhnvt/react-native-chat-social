/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView, StyleSheet, View, useColorScheme } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

import StackNavigator from "./src/navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import "./src/constant/fireStore";
import { colors, space } from "./src/theme";
import LottieView from "lottie-react-native";
import LoadingView from "./src/components/AppLoading";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    // backgroundColor: 'while',
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <LoadingView />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
