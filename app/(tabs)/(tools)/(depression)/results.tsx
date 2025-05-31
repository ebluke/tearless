import TabWrapper from "@/components/custom/layout/TabWrapper";
import TResultsCard from "@/components/custom/TResultsCard";
import { ThemedText } from "@/components/defaults/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getResultCards } from "@/lib/results/depressionResults";
import { DepressionStore } from "@/stores/screeningTools/DepressionStore";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DepressionResults = () => {
  const theme = useColorScheme() ?? "dark";
  const depressionStore = DepressionStore;
  const results = getResultCards();
  const [modalVisible, setModalVisible] = useState(false);

  const clear = () => {
    setModalVisible(false);
    depressionStore.clearAnswers();
    router.back();
  };

  const save = () => {
    depressionStore.saveResults();
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
        depressionStore.totalScore < 5
          ? Colors[theme].green
          : depressionStore.totalScore < 15
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
            Suicide Screening Score: {depressionStore.totalScore}
          </ThemedText>
          <View style={styles.miniScore} />
        </View>
      </View>

      <View>
        {results.map((item, key) => (
          <TResultsCard
            type="depression"
            key={key}
            result={item}
            totalScore={depressionStore.totalScore}
          />
        ))}
      </View>

      <View style={styles.exportButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={save}
          activeOpacity={0.8}
        >
          <FontAwesome5 name="save" size={16} color="white" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={shareResults}
          activeOpacity={0.8}
        >
          <FontAwesome5 name="share-alt" size={16} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.discardButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <FontAwesome5 name="trash-alt" size={16} color="white" />
        <Text style={styles.buttonText}>Discard Results</Text>
      </TouchableOpacity>

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
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.8}
              >
                <FontAwesome5 name="times" size={16} color="white" />
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.deleteBtn]}
                onPress={clear}
                activeOpacity={0.8}
              >
                <FontAwesome5 name="trash-alt" size={16} color="white" />
                <Text style={styles.modalBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TabWrapper>
  );
};

export default DepressionResults;
