/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

import StackNavigator from "./src/navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { primary, warning } from "./src/theme";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    // backgroundColor: 'while',
  };

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
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
