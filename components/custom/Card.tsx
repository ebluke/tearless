import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../defaults/ThemedText";

interface CardProps {
  header?: string;
  body?: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ header, body, onPress }) => {
  const theme = useColorScheme() ?? "dark";

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors[theme].fg,
      padding: 18,
      borderRadius: 16,
    },
    header: {
      marginBottom: 8,
    },
    body: {},
  });

  const CardContent = (
    <View style={styles.container}>
      {header && (
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold">{header}</ThemedText>
        </View>
      )}
      {body && (
        <View style={styles.body}>
          <ThemedText>{body}</ThemedText>
        </View>
      )}
    </View>
  );

  return onPress ? (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      {CardContent}
    </TouchableOpacity>
  ) : (
    CardContent
  );
};

export default Card;
