import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import { SongItem } from "@/components/SongItem";
import { Text } from "@/components/Text";
import { Song } from "@/constants/Types";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useStyle } from "@/hooks/useStyle";
import { useThemedColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import MusicInfo from "expo-music-info-2";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Alert,
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
  const [songs, setSongs] = useState<Song[]>([]);
  const [activeSongId, setActiveSongId] = useState<string | null>(null);

  const tColors = useThemedColor();
  const searchWidthAnim = useRef(new Animated.Value(1)).current;
  const { playAudio, stopAudio } = useAudioPlayer();

  const storeSongs = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Data stored successfully");
    } catch (error) {
      console.error("Error storing data", error);
    }
  };

  const loadSongs = async (key: string) => {
    try {
      const songList = await AsyncStorage.getItem(key);
      setSongs(songList ? JSON.parse(songList) : []);

      console.log("Data loaded successfully");
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

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

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/mpeg",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        Alert.alert("Kein Song ausgewählt!");
        return;
      }

      const file = result.assets?.[0];
      if (file && file.uri) {
        const metadata = await (MusicInfo as any).getMusicInfoAsync(file.uri, {
          title: true,
          artist: true,
          album: true,
          genre: true,
          picture: true,
        });

        const newSong: Song = {
          id: Date.now().toString(),
          title: metadata.title || file.name.replace(".mp3", ""),
          artist: metadata.artist || "Unknown",
          duration: "--:--",
          uri: file.uri,
          coverUri: metadata.picture?.pictureData,
        };

        setSongs((prevSongs) => [...prevSongs, newSong]);
      }
    } catch (e) {
      console.error("Fehler beim Hochladen:", e);
      Alert.alert("Fehler beim Hochladen der Datei");
    }
  };
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlay = (song: Song) => {
    if (activeSongId === song.id) return;

    stopAudio();

    setActiveSongId(song.id);
    playAudio(song.uri);
  };

  useEffect(() => {
    loadSongs("songs");
  }, []);

  useEffect(() => {
    storeSongs("songs", JSON.stringify(songs));
  }, [songs]);

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
              <SongItem
                song={song}
                onPlay={() => handlePlay(song)}
                isActive={activeSongId === song.id}
              />
            </Fragment>
          ))}
        </View>

        <TouchableOpacity style={{ marginTop: 20 }} onPress={handleUpload}>
          <Text style={{ color: tColors.tint, fontSize: 18 }}>
            Song hochladen
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.ScrollView>
  );
}
