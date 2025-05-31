import AsyncStorage from "@react-native-async-storage/async-storage";

export type Result = {
  id: string;
  date: string;
  clientName: string;
  screenTool: string;
  totalScore: number;
  optionalNotes: string | null;
  answers: number[];
};

export type User = {
  locale: string;
  results: Result[];
};

const user: User = {
  locale: "",
  results: [],
};

// Add new result object
export const addResult = async (result: Result) => {
  try {
    const storedResults = await AsyncStorage.getItem("results");
    const results: Result[] = storedResults ? JSON.parse(storedResults) : [];
    results.push(result);
    await AsyncStorage.setItem("results", JSON.stringify(results));
  } catch (e) {
    console.error("Error saving result: ", e);
  }
};

// Get results
export const getResults = async (): Promise<Result[]> => {
  try {
    const results = await AsyncStorage.getItem("results");
    return results ? JSON.parse(results) : [];
  } catch (e) {
    console.error("Error fetching results: ", e);
    return [];
  }
};

// Remove a specific result by ID
export const removeResult = async (target: Result) => {
  try {
    const storedResults = await AsyncStorage.getItem("results");
    if (!storedResults) return;

    const results: Result[] = JSON.parse(storedResults);
    const updatedResults = results.filter((r) => r.id !== target.id);

    await AsyncStorage.setItem("results", JSON.stringify(updatedResults));
    console.log("Result removed:", target.id);
  } catch (e) {
    console.error("Error removing result: ", e);
  }
};

// Clear all results
export const clearResults = async () => {
  try {
    await AsyncStorage.removeItem("results");
    console.log("All results cleared.");
  } catch (e) {
    console.error("Error clearing results: ", e);
  }
};

// Update locale
export const setLocale = async (locale: string) => {
  try {
    await AsyncStorage.setItem("locale", locale);
    console.log("Locale set:", locale);
  } catch (e) {
    console.error("Error setting locale: ", e);
  }
};

// Clear all user data
export const clearUser = async () => {
  try {
    await AsyncStorage.multiRemove(["results", "locale"]);
    console.log("User data cleared.");
  } catch (e) {
    console.error("Error clearing user: ", e);
  }
};
