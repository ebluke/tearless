import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AnxietyStore } from "@/stores/screeningTools/AnxietyStore";
import { DepressionStore } from "@/stores/screeningTools/DepressionStore";
import { SuicideStore } from "@/stores/screeningTools/SuicideStore";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../defaults/ThemedText";
import TButton from "./TButton";

interface PromptCardProps {
  prompt: string;
  options?: number;
  type: string;
  questionIndex: number;
}

const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  options = 4,
  type,
  questionIndex,
}) => {
  const theme = useColorScheme() ?? "dark";
  const depressionStore = DepressionStore;
  const anxietyStore = AnxietyStore;
  const suicideStore = SuicideStore;

  // auto store switcher
  let store;
  if (type === "depression") {
    store = depressionStore;
  } else if (type === "anxiety") {
    store = anxietyStore;
  } else if (type === "suicide") {
    store = suicideStore;
  } else {
    throw new Error("error getting store");
  }
  const selectedValue = store.answers[questionIndex];

  const handlePress = (value: number) => {
    store.answerQuestion(questionIndex, value);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors[theme].fg,
      borderRadius: 16,
    },
    header: {
      marginBottom: 20,
    },
    body: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    answer: {
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: Colors[theme].fg_alt,
      borderRadius: 20,
      width: 60,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    answerText: {
      color: Colors[theme].text,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText>{prompt}</ThemedText>
      </View>
      <View style={styles.body}>
        {[0, 1, 2, 3].map((val) => (
          <TButton
            key={val}
            type="result"
            onPress={() => handlePress(val)}
            title={`${val}`}
            selected={selectedValue === val}
          />
        ))}
      </View>
    </View>
  );
};

export default observer(PromptCard);
