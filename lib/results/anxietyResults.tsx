export const getResultCards = () => [
  {
    title: "Moderate - Severe",
    score: ">10",
    description:
      "Warrants treatment for depression, using antidepressant, psychotherapy and/or a combination of treatment.",
    color: "red",
  },
  {
    title: "Mild - Moderate",
    score: "5 - 10",
    description:
      "Physicians use clinical judgment about treatment, based on patient's duration of symptoms and functional impairment.",
    color: "orange",
  },
  {
    title: "Normal (Minimal)",
    score: "0 - 4",
    description:
      "The score suggests the patient may not need depression treatment.",
    color: "green",
  },
];
