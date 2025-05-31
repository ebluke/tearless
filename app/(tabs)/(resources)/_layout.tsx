import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import React from "react";

export default function ResourcesLayout() {
  const theme = useColorScheme() ?? "dark";

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[theme].bg,
        },
        headerShadowVisible: false,
        headerTintColor: Colors[theme].primary_alt,
        headerTitleStyle: {
          fontWeight: "bold",
          color: Colors[theme].text,
        },
      }}
    >
      <Stack.Screen
        name="resources"
        options={{ title: "Resources", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="anxietyInfo"
        options={{ title: "Anxiety Disorder", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="depressionInfo"
        options={{ title: "Depressive Disorder", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="epilepsyInfo"
        options={{ title: "Epilepsy", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="suicideInfo"
        options={{ title: "Suicidality", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="basicInfo"
        options={{ title: "Basic Concepts", headerBackTitle: "Back" }}
      />
    </Stack>
  );
}
