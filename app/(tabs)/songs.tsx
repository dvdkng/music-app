import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import { SongItem } from "@/components/SongItem";
import { View } from "@/components/ThemedView";
import { dummySongs } from "@/constants/dummySongs";
import React, { useRef } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SongsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <AnimatedHeadline scrollY={scrollY} title="Songs" />

        <View style={{ paddingHorizontal: 16 }}>
          {dummySongs.map((song) => (
            <SongItem key={song.id} song={song} />
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
