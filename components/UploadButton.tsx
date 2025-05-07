// src/components/UploadButton.tsx

import { Song } from "@/constants/Types";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Alert, Button } from "react-native";

const UploadButton = ({ onUpload }: { onUpload: (song: Song) => void }) => {
  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/mpeg", // Nur MP3-Dateien
        copyToCacheDirectory: true,
        multiple: false, // Nur eine Datei auswählen
      });

      if (result.canceled) {
        Alert.alert("Kein Song ausgewählt!");
        return;
      }

      const file = result.assets?.[0];
      if (file && file.uri) {
        const newSong: Song = {
          id: Date.now().toString(),
          title: file.name.replace(".mp3", ""),
          artist: "Unknown", // Du kannst später den Künstler dynamisch setzen
          duration: "--:--", // Später kannst du die Dauer berechnen
          uri: file.uri, // URI der hochgeladenen MP3-Datei
        };

        onUpload(newSong); // Übergebe den Song an die übergeordnete Komponente
      }
    } catch (e) {
      console.error("Fehler beim Hochladen:", e);
      Alert.alert("Fehler beim Hochladen der Datei");
    }
  };

  return <Button title="MP3 Hochladen und Abspielen" onPress={handleUpload} />;
};

export default UploadButton;
