import { useStyle } from "@/hooks/useStyle";
import React from "react";
import {
  Text as NText,
  TextProps as NTextProps,
  TextStyle,
} from "react-native";

type TextProps = NTextProps & {
  style?: TextStyle;
};

export function Text({ style, children, ...rest }: TextProps) {
  const styles = useStyle((colors, { fontSizes }) => ({
    text: {
      color: colors.text.default,
      fontSize: fontSizes.body,
    },
  }));

  return (
    <NText style={[styles.text, style]} {...rest}>
      {children}
    </NText>
  );
}
