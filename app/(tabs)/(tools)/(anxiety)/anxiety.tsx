import TabWrapper from "@/components/custom/layout/TabWrapper";
import PromptCard from "@/components/custom/PromptCard";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getQuestions } from "@/lib/screeningQuestions/anxietyQuestions";

import { AnxietyStore } from "@/stores/screeningTools/AnxietyStore";
import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const AnxietyScreener = () => {
  const questions = getQuestions();
  const anxietyStore = AnxietyStore;
  const theme = useColorScheme() ?? "dark";

  const [shouldShowButton, setShouldShowButton] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (anxietyStore.finished) {
      setShouldShowButton(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShouldShowButton(false));
    }
  }, [anxietyStore.finished]);

  return (
    <View style={{ flex: 1 }}>
      <TabWrapper>
        {questions.map((item, index) => (
          <PromptCard
            key={index}
            type="anxiety"
            questionIndex={index}
            prompt={item.question}
          />
        ))}
        <View
          style={{ paddingBottom: 54, backgroundColor: Colors[theme].bg }}
        ></View>
      </TabWrapper>

      {/* Floating Button Outside of TabWrapper */}
      {shouldShowButton && (
        <Animated.View style={[styles.floatingButtonContainer, { opacity }]}>
          <Pressable
            style={[
              styles.floatingButton,
              { backgroundColor: Colors[theme].primary_alt },
            ]}
            onPress={() => {
              router.push("/(tabs)/(tools)/(anxiety)/results");
            }}
          >
            <Text style={styles.floatingButtonText}>View Results</Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};

export default observer(AnxietyScreener);

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100,
  },
  floatingButton: {
    paddingHorizontal: 100,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
