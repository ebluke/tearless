import TabWrapper from "@/components/custom/layout/TabWrapper";
import ToolCard from "@/components/custom/ToolCard";
import { ThemedText } from "@/components/defaults/ThemedText";
import { Colors } from "@/constants/Colors";
import { getResults, Result } from "@/lib/storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function index() {
  const [chartData, setChartData] = useState<
    { label: string; value: number }[]
  >([]);
  const theme = useColorScheme() ?? "dark";

  useEffect(() => {
    const fetchResults = async () => {
      const results: Result[] = await getResults();
      const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const weekCounts = new Array(7).fill(0);

      const now = new Date();
      const firstDayOfWeek = new Date(now);
      const day = firstDayOfWeek.getDay();
      const diff = (day === 0 ? -6 : 1) - day;
      firstDayOfWeek.setDate(now.getDate() + diff);
      firstDayOfWeek.setHours(0, 0, 0, 0);

      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      lastDayOfWeek.setHours(23, 59, 59, 999);

      results.forEach((result) => {
        const resultDate = new Date(Number(result.date));
        if (resultDate >= firstDayOfWeek && resultDate <= lastDayOfWeek) {
          const dayIndex = (resultDate.getDay() + 6) % 7;
          weekCounts[dayIndex]++;
        }
      });

      const formattedData = weekDays.map((day, index) => ({
        label: day,
        value: weekCounts[index],
      }));

      setChartData(formattedData);
    };

    fetchResults();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
    },
    charts: {
      flex: 1,
      backgroundColor: Colors[theme].bg,
      paddingHorizontal: 16,
      paddingTop: 40,
      marginTop: 20,
      borderRadius: 16,
      justifyContent: "center",
      paddingLeft: 0,
      marginLeft: 0,
      paddingRight: 100,
    },
    tools: {
      marginTop: 20,
    },
  });

  return (
    <TabWrapper>
      <View style={styles.container}>
        <ThemedText type="title">Welcome to Tearless</ThemedText>
        <View>
          <ThemedText type="default">
            This week's screening statistics
          </ThemedText>
          <View style={styles.charts}>
            {chartData.length > 0 ? (
              <LineChart
                data={{
                  labels: chartData.map((d) => d.label),
                  datasets: [{ data: chartData.map((d) => d.value) }],
                }}
                width={screenWidth - 80}
                height={220}
                fromZero
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: Colors[theme].bg,
                  backgroundGradientFrom: Colors[theme].bg,
                  backgroundGradientTo: Colors[theme].bg,
                  decimalPlaces: 0,
                  color: () => "#ffffff",
                  labelColor: () => "#ffffff",
                  propsForDots: {
                    r: 5,
                    stroke: Colors[theme].primary_alt,
                    fill: Colors[theme].primary_alt,
                  },
                  propsForBackgroundLines: {
                    stroke: Colors[theme].bg,
                  },
                }}
                bezier
                style={{ borderRadius: 16, backgroundColor: Colors[theme].bg }}
              />
            ) : (
              <Text style={{ color: Colors[theme].text }}>
                No data for this week
              </Text>
            )}
          </View>
        </View>
        <View style={styles.tools}>
          <ThemedText type="defaultSemiBold">Screening Suite</ThemedText>
          <ToolCard
            title="Depression"
            icon="sad-tear"
            color="#F59E0B"
            route="/(depression)/depressionGuide"
            style={{ marginTop: 20 }}
          />
          <ToolCard
            title="Anxiety"
            icon="heartbeat"
            color="#3B82F6"
            route="/(anxiety)/anxietyGuide"
            style={{ marginTop: 20 }}
          />
          <ToolCard
            title="Suicide"
            icon="exclamation-triangle"
            color="#EF4444"
            route="/(suicide)/suicideGuide"
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    </TabWrapper>
  );
}
