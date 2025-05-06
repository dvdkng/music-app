import { spacing } from "@/constants/Spacing";
import { fontSizes } from "@/constants/Typography";
import { useStyle } from "@/hooks/useStyle";
import React from "react";
import { Animated, Text, TextStyle, View, ViewStyle } from "react-native";

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
  const styles = useStyle((colors, { spacing, lineHeights, fontWeights }) => ({
    container: {
      paddingHorizontal: spacing.md,
    },
    headline: {
      color: colors.text.title,
      lineHeight: lineHeights.headline1,
      fontWeight: fontWeights.bold,
    },
  }));

  const animatedFontSize = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [
      fontSizes.headline1 + 10,
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
