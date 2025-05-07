import { Audio } from "expo-av";
import { useState } from "react";

export const useAudioPlayer = () => {
  const [sound, setSound] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playAudio = async (uri: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(sound);
      setIsPlaying(true);
    } catch (error) {
      console.error("Fehler beim Abspielen der Datei:", error);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  return { playAudio, stopAudio, isPlaying };
};
