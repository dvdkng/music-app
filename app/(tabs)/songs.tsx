import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import React, { useRef } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { dummySongs } from "@/constants/dummySongs";

export default function SongsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      <SafeAreaView>
        <AnimatedHeadline scrollY={scrollY} title="Songs" />


      </SafeAreaView>
    </Animated.ScrollView>
  );
}
