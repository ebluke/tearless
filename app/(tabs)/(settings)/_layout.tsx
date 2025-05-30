import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import React from "react";

export default function SettingsLayout() {
  const theme = useColorScheme() ?? "dark";

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[theme].bg,
        },
        headerShadowVisible: false,
        headerTintColor: Colors[theme].fg,
        headerTitleStyle: {
          fontWeight: "bold",
          color: Colors[theme].text,
        },
      }}
    />
  );
}
