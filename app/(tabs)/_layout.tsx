import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

import { HapticTab } from "@/components/HapticTab";
import { useThemedColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";

export default function TabLayout() {
  const colors = useThemedColor();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <BlurView
            intensity={95}
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: "hidden",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ),
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 8
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{
          title: "Songs",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="itunes-note" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="playlists"
        options={{
          title: "Playlists",
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
