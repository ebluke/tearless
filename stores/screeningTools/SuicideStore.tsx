import { addResult } from "@/lib/storage";
import { makeAutoObservable } from "mobx";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

class SuicideDataStore {
  totalScore = 0;
  questionCount = 5;
  finished = false;
  optionalNotes = "";
  answers = Array.from({ length: this.questionCount }, () => -1); // populate with null values

  // mobx constructor
  constructor() {
    makeAutoObservable(this);
    this.answers = Array.from({ length: this.questionCount }, () => -1);
  }

  checkFinishedAndScore() {
    let totalScore = 0;

    for (let i = 0; i < this.questionCount; i++) {
      const answer = this.answers[i];
      if (answer === -1) {
        return;
      }
      totalScore += answer;
    }

    this.finished = true;
    this.totalScore = totalScore;
  }

  // change surface level values
  set<K extends keyof this>(key: K, value: this[K]) {
    this[key] = value;
  }

  answerQuestion(index: number, value: number) {
    if (index >= 0 && index < this.questionCount) {
      this.answers[index] = value;
    }
    this.checkFinishedAndScore();
  }

  clearAnswers() {
    for (let i = 0; i < this.questionCount; i++) {
      this.answers[i] = -1;
    }
    this.finished = false;
    this.totalScore = 0; // unneeded
    this.optionalNotes = "";
  }

  // exporting
  saveResults() {
    const result = {
      id: uuidv4(),
      date: Date.now().toString(),
      clientName: "swag mcnicholson",
      screenTool: "suicide",
      totalScore: this.totalScore,
      optionalNotes: this.optionalNotes == "" ? null : this.optionalNotes,
      answers: this.answers,
    };
    addResult(result);
  }
}
export const SuicideStore = new SuicideDataStore();
