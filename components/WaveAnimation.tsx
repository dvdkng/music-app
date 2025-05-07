import { tint } from "@/constants/Colors";
import { useStyle } from "@/hooks/useStyle";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const NUM_BARS = 5;
const DURATION = 600;

export const WaveAnimation = ({
  height = 25,
  width = 40,
  color,
}: {
  height?: number;
  width?: number;
  color?: string;
}) => {
  const c = color || tint;

  const styles = useStyle(() => ({
    container: {
      height,
      width,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    bar: {
      flex: 1,
      marginHorizontal: 2,
      backgroundColor: c,
      borderRadius: 2,
    },
  }));

  const animations = useRef(
    Array.from({ length: NUM_BARS }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animateBar = (animatedValue: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: DURATION,
            delay,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    animations.forEach((anim, i) => animateBar(anim, i * 100));
  }, []);

  return (
    <View style={styles.container}>
      {animations.map((anim, index) => {
        const barHeight = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [height * 0.2, height],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                height: barHeight,
              },
            ]}
          />
        );
      })}
    </View>
  );
};
