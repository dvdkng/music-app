import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import { Text } from "@/components/Text";
import { dummySongs, Song } from "@/constants/dummySongs";
import { useStyle } from "@/hooks/useStyle";
import { useThemedColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Fragment, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SongsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const tColors = useThemedColor();
  const searchWidthAnim = useRef(new Animated.Value(1)).current;

  const styles = useStyle((colors, { spacing }) => ({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      gap: spacing.lg,
    },
    songsContainer: {
      gap: spacing.md,
    },
    searchWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background.card,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text.default,
      padding: 0,
    },
    cancelButton: {
      marginLeft: spacing.sm,
    },
    cancelText: {
      color: colors.tint,
      fontSize: 16,
    },
  }));

  const filteredSongs = dummySongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={styles.container}>
        <AnimatedHeadline scrollY={scrollY} title="Songs" />

        <View style={styles.searchWrapper}>
          <Animated.View
            style={[
              styles.searchBox,
              {
                flex: searchWidthAnim,
              },
            ]}
          >
            <Ionicons
              name="search"
              size={18}
              color={tColors.text.subtitle}
              style={{ marginRight: 8 }}
            />
            <TextInput
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearching(true)}
              onBlur={() => {
                if (searchQuery === "") setIsSearching(false);
              }}
              placeholderTextColor={tColors.text.subtitle}
              style={styles.searchInput}
            />
          </Animated.View>

          {(isSearching || searchQuery.length > 0) && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setIsSearching(false);
                Keyboard.dismiss();
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.songsContainer}>
          {filteredSongs.map((song: Song) => (
            <Fragment key={song.id}>
              <SongItem song={song} />
            </Fragment>
          ))}
        </View>
      </SafeAreaView>
    </Animated.ScrollView>
  );
}

const SongItem = ({ song }: { song: Song }) => {
  const { artist, title } = song;
  const tColors = useThemedColor();

  const styles = useStyle((colors, { spacing, fontWeights }) => ({
    container: {
      paddingVertical: spacing.xs,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    infoContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    title: {
      fontWeight: fontWeights.bold,
    },
    artist: {
      color: colors.text.subtitle,
    },
    cover: {
      aspectRatio: 1,
      width: 60,
      backgroundColor: colors.background.card,
      borderRadius: 8,
    },
    dotsButton: {
      padding: 5,
    },
  }));

  return (
    <TouchableOpacity activeOpacity={0.75}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.cover} />
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.artist}>{artist}</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.dotsButton}>
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color={tColors.text.subtitle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
