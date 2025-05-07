import { Song } from "@/constants/Types";
import { useStyle } from "@/hooks/useStyle";
import { useThemedColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "./Text";

export const SongItem = ({
  song,
  onPlay,
}: {
  song: Song;
  onPlay: (uri: string) => void;
}) => {
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
      flexShrink: 1,
    },
    contentContainer: {
      flexShrink: 1,
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
    <>
    {console.log("SongItem", song)}
      <TouchableOpacity activeOpacity={0.75} onPress={() => onPlay(song.uri)}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.cover}>
              {song.coverUri ? (
                <Image
                  source={
                    song.coverUri.startsWith("data:image/")
                      ? { uri: song.coverUri }
                      : { uri: song.coverUri || undefined }
                  }
                  style={styles.cover}
                  onError={() =>
                    console.error(
                      "Fehler beim Laden des Covers:",
                      song.coverUri
                    )
                  }
                />
              ) : (
                <Text>No IMG</Text>
              )}
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {title}
              </Text>
              <Text
                style={styles.artist}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {artist}
              </Text>
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
    </>
  );
};
