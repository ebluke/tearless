import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

interface TabWrapperProps {
  children: React.ReactNode;
  header?: String;
}

const TabWrapper: React.FC<TabWrapperProps> = ({ children }) => {
  const colorScheme = useColorScheme() ?? "dark";
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].bg,
      marginTop: 0,
      paddingHorizontal: 16,
    },
    scrollViewStyle: {
      paddingVertical: 12,
      paddingHorizontal: 6,
    },
    childrenContainer: {
      gap: 12,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.childrenContainer}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default TabWrapper;
