import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../defaults/ThemedText";

interface CardProps {
  header?: string;
  body?: string;
}

const Card: React.FC<CardProps> = ({ header, body }) => {
  const theme = useColorScheme() ?? "dark";

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors[theme].fg,
      padding: 18,
      borderRadius: 16,
    },
    header: {},
    body: {},
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold">{header}</ThemedText>
      </View>

      <View style={styles.body}>
        <ThemedText>{body}</ThemedText>
      </View>
    </View>
  );
};

export default Card;
