import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const theme = useColorScheme() ?? "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors[theme].fg,
          height: 80,
          paddingTop: 12,
          paddingBottom: 18,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 10,
        },
        tabBarActiveTintColor: Colors[theme].text,
        tabBarInactiveTintColor: Colors[theme].subtext,

        // Remove header globally from Tabs
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(tools)"
        options={{
          title: "Tools",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(results)"
        options={{
          title: "Results",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="chart-line" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(resources)"
        options={{
          title: "Resources",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="lightbulb" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="sliders-h" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
