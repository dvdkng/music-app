import { Text } from "@/components/ThemedText";
import { View } from "@/components/ThemedView";
import { Song } from "@/constants/dummySongs";
import { spacing } from "@/constants/Spacing";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  song: Song;
  onPress?: () => void;
};

export function SongItem({ song, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{song.title}</Text>
          <Text type="subtitle" style={styles.artist}>
            {song.artist}
          </Text>
        </View>
        <Text>{song.duration}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  artist: {
    fontSize: 14,
  },
});
