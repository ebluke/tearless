import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function ResultsLayout() {
  const theme = useColorScheme() ?? "dark";

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[theme].bg,
        },
        headerTintColor: Colors[theme].text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="results"
        options={{
          title: "Results",
        }}
      />
    </Stack>
  );
}
