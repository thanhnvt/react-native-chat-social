import React, { useEffect } from "react";

import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import EventEmitter, { EMIT_ACTION } from "../constant/eventEmitter";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { screenSize, space } from "../theme";

const LoadingView = () => {
  const scaleValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);
  const borderRadiusValue = useSharedValue(screenSize.width);
  const animatedStyled = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
      opacity: opacityValue.value,
      borderRadius: borderRadiusValue.value,
    };
  });
  useEffect(() => {
    const eventShow = EventEmitter.addListener(
      EMIT_ACTION.SHOW_LOADING,
      (data) => {
        scaleValue.value = withTiming(1);
        opacityValue.value = withTiming(1);
        borderRadiusValue.value = withTiming(0);
      }
    );
    const eventHide = EventEmitter.addListener(
      EMIT_ACTION.HIDE_LOADING,
      (data) => {
        scaleValue.value = withTiming(0);
        opacityValue.value = withTiming(0);
        borderRadiusValue.value = withTiming(screenSize.width);
      }
    );
    return () => {
      eventShow.remove();
      eventHide.remove();
    };
  }, []);

  const onAnimatedValueUpdate = (value: any) => {
    // Update the state of your component based on the new value
  };

  return (
    <Animated.View style={[styles.loadingContainer, animatedStyled]}>
      <LottieView
        source={require("../assets/json/loading-animation.json")}
        style={styles.lotteView}
        autoPlay
        loop
      />
    </Animated.View>
  );
};

export default React.memo(LoadingView);

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    opacity: 1,
  },
  lotteView: {
    width: space.md * 8,
    height: space.md * 8,
  },
});
