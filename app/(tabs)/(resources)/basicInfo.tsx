import TabWrapper from "@/components/custom/layout/TabWrapper";
import { Collapsible } from "@/components/defaults/Collapsible";
import { ThemedText } from "@/components/defaults/ThemedText";
import content from "@/stores/resources/basic.json";

import React from "react";

export default function basicConcepts() {
  return (
    <TabWrapper>
      {content.sections.map((section, i) => (
        <Collapsible key={i} title={section.title}>
          <ThemedText>{section.body}</ThemedText>
        </Collapsible>
      ))}
    </TabWrapper>
  );
}
