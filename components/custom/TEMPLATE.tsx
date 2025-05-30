import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, View } from "react-native";

type TemplateTypes = "ex1" | "ex2";

interface MTemplateProps {
  value?: string;
  type?: TemplateTypes;
}

const MTemplate: React.FC<MTemplateProps> = ({ value }) => {
  const theme = useColorScheme() ?? "dark";

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors[theme].fg,
    },
    body: {},
    button: {},
  });

  return <View></View>;
};

export default MTemplate;
