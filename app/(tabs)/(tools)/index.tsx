import TabWrapper from "@/components/custom/layout/TabWrapper";
import ToolCard from "@/components/custom/ToolCard";
import { ThemedText } from "@/components/defaults/ThemedText";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function index() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
    },
    charts: {
      flex: 1,
      backgroundColor: "#053355",
      paddingHorizontal: 16,
      paddingTop: 100,
      paddingBottom: 100,
      marginTop: 20,
    },
    tools: { marginTop: 20 },
  });
  return (
    <TabWrapper>
      <View style={styles.container}>
        <ThemedText type="title">Welcome to Tearless</ThemedText>
        <View>
          <ThemedText type="default">
            This weeks screening statistics
          </ThemedText>

          <View style={styles.charts}>
            <Text>Spacer</Text>
          </View>
        </View>
        <View style={styles.tools}>
          <ThemedText type="defaultSemiBold">Screening Suite</ThemedText>
          <ToolCard
            title="Depression"
            icon="sad-tear"
            color="white"
            route="/(depression)/depressionGuide"
            style={{ marginTop: 20 }}
          />
          <ToolCard
            title="Anxiety"
            icon="sad-tear"
            color="white"
            route="/(anxiety)/anxietyGuide"
            style={{ marginTop: 20 }}
          />
          <ToolCard
            title="Suicide"
            icon="sad-tear"
            color="white"
            route="/(suicide)/suicideGuide"
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    </TabWrapper>
  );
}
