import Card from "@/components/custom/Card";
import TabWrapper from "@/components/custom/layout/TabWrapper";
import { ThemedText } from "@/components/defaults/ThemedText";

import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function SuicideGuide() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/(tabs)/(tools)/(suicide)/suicide");
  };

  return (
    <TabWrapper>
      <ThemedText type="title">Suicide Screening</ThemedText>
      <Card
        header="Tool Usage:"
        body={
          "The following screening tool is used to help screen individuals for suicide. \n\nPlease read the prompt to the individual prior to the screening process."
        }
      />
      <Card
        header="Question Prompt:"
        body="Over the last 2 weeks, how often have you been bothered by any of the following problems? "
      />
      <Button
        title="Continue"
        onPress={() => router.push("/(tabs)/(tools)/(suicide)/suicide")}
      />
    </TabWrapper>
  );
}
