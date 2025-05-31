import TabWrapper from "@/components/custom/layout/TabWrapper";
import ToolCard from "@/components/custom/ToolCard";
import React from "react";

export default function resources() {
  return (
    <TabWrapper>
      <ToolCard
        title="Basic Concepts of Mental Health"
        icon="brain"
        color="#3B82F6"
        route="basicInfo"
        style={{ marginTop: 10 }}
      />
      <ToolCard
        title="Depressive Disorder"
        icon="sad-tear"
        color="#F59E0B"
        route="depressionInfo"
        style={{ marginTop: 10 }}
      />
      <ToolCard
        title="Anxiety Disorder"
        icon="heartbeat"
        color="#3B82F6"
        route="anxietyInfo"
        style={{ marginTop: 10 }}
      />
      <ToolCard
        title="Suicidality"
        icon="exclamation-triangle"
        color="#EF4444"
        route="suicideInfo"
        style={{ marginTop: 10 }}
      />
      <ToolCard
        title="Positive Mental Health Techniques"
        icon="smile-beam"
        color="#10B981"
        route="wellbeingInfo"
        style={{ marginTop: 10 }}
      />
      <ToolCard
        title="Epilepsy"
        icon="bolt"
        color="#8B5CF6"
        route="epilepsyInfo"
        style={{ marginTop: 10 }}
      />
    </TabWrapper>
  );
}
