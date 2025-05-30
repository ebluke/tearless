import TabWrapper from "@/components/custom/layout/TabWrapper";
import TResultsCard from "@/components/custom/TResultsCard";
import { ThemedText } from "@/components/defaults/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getResultCards } from "@/lib/results/anxietyResults";
import { AnxietyStore } from "@/stores/screeningTools/AnxietyStore";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const DepressionResults = () => {
  const theme = useColorScheme() ?? "dark";
  const anxietyStore = AnxietyStore;
  const results = getResultCards();
  const [modalVisible, setModalVisible] = useState(false);

  const clear = () => {
    setModalVisible(false);
    anxietyStore.clearAnswers();
    router.back();
  };

  const save = () => {
    anxietyStore.saveResults();
    clear();
  };

  const shareResults = async () => {
    // Placeholder for share functionality
  };

  const styles = StyleSheet.create({
    scores: {
      flex: 1,
      padding: 0,
      gap: 10,
    },
    scoreTop: {
      flexDirection: "row",
      alignItems: "center",
    },
    miniScore: {
      borderRadius: 20,
      backgroundColor:
        anxietyStore.totalScore < 5
          ? Colors[theme].green
          : anxietyStore.totalScore < 15
          ? Colors[theme].orange
          : Colors[theme].red,
      width: 20,
      height: 15,
      marginLeft: 10,
    },
    exportButtons: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: 20,
      gap: 10,
    },
    button: {
      flex: 1,
      backgroundColor: Colors[theme].primary,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
    },
    buttonText: {
      color: Colors[theme].text,
      fontWeight: "bold",
    },
    discardButton: {
      marginTop: 20,
      backgroundColor: Colors[theme].error,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalContent: {
      width: "100%",
      borderRadius: 20,
      padding: 20,
      backgroundColor: Colors[theme].bg,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
      color: Colors[theme].text,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 10,
    },
    modalBtn: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    cancelBtn: {
      backgroundColor: Colors[theme].alt,
    },
    deleteBtn: {
      backgroundColor: Colors[theme].error,
    },
    modalBtnText: {
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <TabWrapper>
      <View style={styles.scores}>
        <View style={styles.scoreTop}>
          <ThemedText type="defaultSemiBold">
            Suicide Screening Score: {anxietyStore.totalScore}
          </ThemedText>
          <View style={styles.miniScore} />
        </View>
      </View>

      <View>
        {results.map((item, key) => (
          <TResultsCard
            type="suicide"
            key={key}
            result={item}
            totalScore={anxietyStore.totalScore}
          />
        ))}
      </View>

      <View style={styles.exportButtons}>
        <Pressable style={styles.button} onPress={save}>
          <FontAwesome5 name="save" size={16} color="white" />
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={shareResults}>
          <FontAwesome5 name="share-alt" size={16} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.discardButton}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome5 name="trash-alt" size={16} color="white" />
        <Text style={styles.buttonText}>Discard Results</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to discard the screening results?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesome5 name="times" size={16} color="white" />
                <Text style={styles.modalBtnText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, styles.deleteBtn]}
                onPress={clear}
              >
                <FontAwesome5 name="trash-alt" size={16} color="white" />
                <Text style={styles.modalBtnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </TabWrapper>
  );
};

export default DepressionResults;
