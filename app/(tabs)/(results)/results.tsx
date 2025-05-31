import Card from "@/components/custom/Card";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { clearResults, getResults, removeResult } from "@/lib/storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

export type Result = {
  id: string;
  date: string;
  clientName: string;
  screenTool: string;
  totalScore: number;
  optionalNotes: string | null;
  answers: number[];
};

export default function Results() {
  const theme = useColorScheme() ?? "dark";
  const navigation = useNavigation();

  const [results, setResults] = useState<Result[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchResults = async () => {
        const storedResults = await getResults();
        setResults(storedResults);
      };
      fetchResults();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesome5
            name="trash"
            size={20}
            color={Colors[theme].error}
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme]);

  const handleDelete = async (result: Result) => {
    await removeResult(result);
    const updated = await getResults();
    setResults(updated);
  };

  const handleDeleteAll = async () => {
    await clearResults();
    const updated = await getResults();
    setResults(updated);
    setModalVisible(false);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const filteredResults = results.filter((result) =>
    result.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].bg }]}>
      <View style={styles.searchContainer}>
        <FontAwesome5
          name="search"
          size={16}
          color="#000"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search by client name"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      {filteredResults.length === 0 ? (
        <Text style={[styles.noResultsText, { color: Colors[theme].text }]}>
          No results found
        </Text>
      ) : (
        <SwipeListView
          data={filteredResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: Colors[theme].fg,
                borderRadius: 16,
                marginBottom: 12,
                overflow: "hidden",
              }}
            >
              <Card
                header={`${item.clientName} - ${formatDate(Number(item.date))}`}
                body={`The following results are from a ${item.screenTool} assessment, in which the client received a score of ${item.totalScore}.`}
                onPress={() => {}}
              />
            </View>
          )}
          renderHiddenItem={({ item }) => (
            <View
              style={[
                styles.rowBack,
                {
                  backgroundColor: Colors[theme].error,
                  borderRadius: 16,
                  marginBottom: 12,
                },
              ]}
            >
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <FontAwesome5 name="trash" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75}
          disableRightSwipe
          contentContainerStyle={{ padding: 8 }}
        />
      )}

      {/* Delete All Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: Colors[theme].bg }]}
          >
            <Text style={[styles.modalText, { color: Colors[theme].text }]}>
              Are you sure you want to delete all results?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  { backgroundColor: Colors[theme].alt },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesome5 name="times" size={16} color="white" />
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  { backgroundColor: Colors[theme].error },
                ]}
                onPress={handleDeleteAll}
              >
                <FontAwesome5 name="trash" size={16} color="white" />
                <Text style={styles.modalBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
  },
  rowBack: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    flexDirection: "row",
    paddingRight: 20,
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
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
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
  modalBtnText: {
    color: "white",
    fontWeight: "bold",
  },
});
