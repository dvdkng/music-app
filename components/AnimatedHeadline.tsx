import { Text } from "@/components/ThemedText";
import { View } from "@/components/ThemedView";
import { spacing } from "@/constants/Spacing";
import { fontSizes, fontWeights, lineHeights } from "@/constants/Typography";
import React from "react";
import { Animated, StyleSheet, TextStyle, ViewStyle } from "react-native";

type AnimatedHeadlineProps = {
  scrollY: Animated.Value;
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

export function AnimatedHeadline({
  scrollY,
  title,
  containerStyle,
  textStyle,
}: AnimatedHeadlineProps) {
  const animatedFontSize = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [
      fontSizes.headline1 + 12,
      fontSizes.headline1,
      fontSizes.headline1 - 4,
    ],
    extrapolate: "clamp",
  });

  const animatedPaddingTop = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [spacing.xl, spacing.md, spacing.sm],
    extrapolate: "clamp",
  });

  return (
    <AnimatedView
      style={[
        styles.container,
        containerStyle,
        { paddingTop: animatedPaddingTop },
      ]}
    >
      <AnimatedText
        type="title"
        style={[styles.headline, textStyle, { fontSize: animatedFontSize }]}
      >
        {title}
      </AnimatedText>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  headline: {
    lineHeight: lineHeights.headline1,
    fontWeight: fontWeights.bold,
  },
});
