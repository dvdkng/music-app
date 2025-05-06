import { colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemedColor(
  overrides?: { light?: Partial<typeof colors.light>; dark?: Partial<typeof colors.dark> }
) {
  const theme = useColorScheme() ?? 'light';
  const baseColors = colors[theme];

  const mergedColors = {
    ...baseColors,
    ...overrides?.[theme],
  };

  return mergedColors;
}
