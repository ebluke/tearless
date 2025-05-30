import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import React from "react";

export default function ToolsLayout() {
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
    >
      {/* index */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* results */}
      <Stack.Screen name="(depression)/results" options={{ title: "Result" }} />
      <Stack.Screen name="(anxiety)/results" options={{ title: "Result" }} />
      <Stack.Screen name="(suicide)/results" options={{ title: "Result" }} />

      {/* tools */}
      <Stack.Screen
        name="(anxiety)/anxiety"
        options={{ title: "Anxiety Screener" }}
      />
      <Stack.Screen
        name="(suicide)/suicide"
        options={{ title: "Suicide Screener" }}
      />
      <Stack.Screen
        name="(depression)/depression"
        options={{ title: "Depression Screener", headerBackTitle: "Back" }}
      />
      {/* guides -- remove for improvement is to use slugs here and render a single component dynamically */}
      <Stack.Screen
        name="(suicide)/suicideGuide"
        options={{ title: "Screening Guide" }}
      />
      <Stack.Screen
        name="(anxiety)/anxietyGuide"
        options={{ title: "Screening Guide" }}
      />
      <Stack.Screen
        name="(depression)/depressionGuide"
        options={{ title: "Screening Guide" }}
      />
    </Stack>
  );
}
