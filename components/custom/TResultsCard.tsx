import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../defaults/ThemedText";

interface Result {
  title: string;
  score: string;
  description: string;
  color: string;
}

interface TResultsCardProps {
  result: Result;
  totalScore: number;
  type: "suicide" | "depression" | "anxiety";
}

const TResultsCard: React.FC<TResultsCardProps> = ({
  result,
  totalScore,
  type,
}) => {
  const theme = useColorScheme() ?? "dark";

  // Define highlighting logic based on tool type
  let shouldHighlight = false;
  if (type === "suicide") {
    shouldHighlight =
      (totalScore > 1 && result.score === ">1") ||
      (totalScore === 0 && result.score === "0");
  } else if (type === "depression") {
    shouldHighlight =
      (totalScore > 14 && result.score === ">14") ||
      (totalScore >= 5 && totalScore <= 14 && result.score === "5 - 14") ||
      (totalScore >= 0 && totalScore <= 4 && result.score === "0 - 4");
  } else if (type === "anxiety") {
    shouldHighlight =
      (totalScore > 10 && result.score === ">10") ||
      (totalScore >= 5 && totalScore <= 9 && result.score === "5 - 9") ||
      (totalScore >= 0 && totalScore <= 4 && result.score === "0 - 4");
  }

  const getColor = (color: string) =>
    color === "red"
      ? Colors[theme].red
      : color === "orange"
      ? Colors[theme].orange
      : Colors[theme].green;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: Colors[theme].fg,
      borderRadius: 16,
      gap: 10,
      marginBottom: 16,
      borderWidth: shouldHighlight ? 2 : 0,
      borderColor: getColor(result.color),
    },
    header: {
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      gap: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    score: {
      height: 55,
      width: 75,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      backgroundColor: getColor(result.color),
    },
    body: {
      flex: 1,
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold">{result.title}</ThemedText>
      </View>
      <View style={styles.content}>
        <View style={styles.score}>
          <ThemedText type="defaultSemiBold">{result.score}</ThemedText>
        </View>
        <View style={styles.body}>
          <ThemedText>{result.description}</ThemedText>
        </View>
      </View>
    </View>
  );
};

export default observer(TResultsCard);
