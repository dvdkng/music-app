import { Song } from "@/constants/Types";
import { useStyle } from "@/hooks/useStyle";
import { useThemedColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { Image, TouchableOpacity, View } from "react-native";
import { FadeView } from "./FadeView";
import { Text } from "./Text";
import { WaveAnimation } from "./WaveAnimation";

export const SongItem = ({
  song,
  onPlay,
  isActive,
}: {
  song: Song;
  onPlay: (uri: string) => void;
  isActive: boolean;
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
      color: isActive ? colors.text.default : colors.text.subtitle,
    },
    artist: {
      color: colors.text.subtitle,
    },
    cover: {
      aspectRatio: 1,
      width: 60,
      backgroundColor: colors.background.card,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    dotsButton: {
      padding: 5,
    },
  }));

  return (
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
                style={[styles.cover]}
                onError={() =>
                  console.error("Fehler beim Laden des Covers:", song.coverUri)
                }
              />
            ) : (
              <Text>No IMG</Text>
            )}

            <FadeView visible={isActive}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <BlurView
                  tint="systemChromeMaterial"
                  intensity={10}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                />
                <WaveAnimation />
              </View>
            </FadeView>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
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
  );
};
