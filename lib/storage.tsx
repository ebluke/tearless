import AsyncStorage from "@react-native-async-storage/async-storage";
// this is just a template for the result
export type Result = {
  id: string;
  date: string;
  clientName: string;
  screenTool: string;
  totalScore: number;
  optionalNotes: string | null;
  answers: number[];
};

// This is what information we store for the user
export type User = {
  locale: string;
  results: Result[];
};

// this is what we show until we have data for locale
const user: User = {
  locale: "",
  results: [],
};

// FUNCTIONS

// add new result objects
export const addResult = async (result: Result) => {
  try {
    // check for results
    const storedResults = await AsyncStorage.getItem("results");
    const results = storedResults ? JSON.parse(storedResults) : [];

    // append new result to this array
    results.push(result);

    // push whole new array over current array
    const jsonValue = JSON.stringify(results);
    await AsyncStorage.setItem("results", jsonValue);
  } catch (e) {
    console.error("error: ", e);
  }
};

// get results for results page
export const getResults = async () => {
  try {
    const results = await AsyncStorage.getItem("results");
    // check empty
    if (results) {
      return JSON.parse(results);
    } else {
      return [];
    }
  } catch (e) {
    console.error("error fetching: ", e);
    return []; // oops errror just push nothing and we can retry on next page load
  }
};

// remove result object (key)
export const removeResult = async (result: Result) => {
  console.log("removeResult: ", result);
};

// clear all results (nuclear)
export const clearResults = async () => {
  try {
    await AsyncStorage.clear();
    console.log("nuke");
  } catch (e) {
    console.error("error nuke", e);
  }
};

// update locale
export const setLocale = async (locale: string) => {
  console.log("setLocale: ", locale);
};

// remove all user data
export const clearUser = async () => {
  console.log("clearUser: ");
};
