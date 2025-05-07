import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

type FadeProps = {
  visible: boolean;
  duration?: number;
  children: React.ReactNode;
  style?: ViewStyle;
};

export const FadeView = ({
  visible,
  duration = 300,
  children,
  style,
}: FadeProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        { opacity, position: "absolute", width: "100%", height: "100%" },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};
