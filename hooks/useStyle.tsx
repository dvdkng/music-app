import { spacing } from "@/constants/Spacing";
import { fontSizes, fontWeights, lineHeights } from "@/constants/Typography";
import { StyleSheet } from "react-native";
import { useThemedColor } from "./useThemeColor";

export function useStyle<T extends StyleSheet.NamedStyles<T>>(
  stylesFn: (
    colors: ReturnType<typeof useThemedColor>,
    helpers: {
      spacing: typeof spacing;
      fontSizes: typeof fontSizes;
      fontWeights: typeof fontWeights;
      lineHeights: typeof lineHeights;
    }
  ) => T
) {
  const colors = useThemedColor();
  return StyleSheet.create(
    stylesFn(colors, { spacing, fontSizes, fontWeights, lineHeights })
  );
}
