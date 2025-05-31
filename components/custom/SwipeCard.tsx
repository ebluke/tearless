// components/custom/SwipeableCard.tsx

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Card from "./Card";

interface SwipeableCardProps {
  header: string;
  body: string;
  onDelete: () => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  header,
  body,
  onDelete,
}) => {
  const theme = useColorScheme() ?? "dark";
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    return (
      <RectButton style={styles.deleteButton} onPress={onDelete}>
        <FontAwesome name="trash" size={20} color="white" />
        <Text style={styles.deleteText}>Delete</Text>
      </RectButton>
    );
  };

  const styles = StyleSheet.create({
    deleteButton: {
      backgroundColor: Colors[theme].error,
      justifyContent: "center",
      alignItems: "center",
      width: 80,
      borderRadius: 16,
      marginVertical: 4,
    },
    deleteText: {
      color: "white",
      fontSize: 12,
      marginTop: 4,
    },
  });

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
    >
      <Card header={header} body={body} />
    </Swipeable>
  );
};

export default SwipeableCard;
