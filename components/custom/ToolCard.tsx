import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export default function ToolCard({
  title,
  icon,
  color,
  route,
  style,
}: {
  title: string;
  icon: string;
  color: string;
  route: string;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useColorScheme() ?? "dark";
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: Colors[theme].fg }, style]}
      onPress={() => router.push(route)}
    >
      <View style={styles.iconContainer}>
        <FontAwesome5 name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.title, { color: Colors[theme].text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    height: 70,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff22",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
