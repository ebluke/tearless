import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonType = "primary" | "nuclear" | "link" | "result";

interface TButtonProps {
  type?: ButtonType;
  title?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  icon?: keyof typeof FontAwesome5.glyphMap;
}

const TButton: React.FC<TButtonProps> = ({
  type = "primary",
  title,
  onPress,
  style,
  selected,
  icon,
}) => {
  const theme = useColorScheme() ?? "dark";

  // styles
  const baseStyle: ViewStyle = {
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 12,
    flexDirection: "row",
    gap: 8,
  };

  const baseTextStyle: TextStyle = {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors[theme].text,
  };

  const buttonStyles: Record<ButtonType, ViewStyle> = {
    primary: { ...baseStyle, backgroundColor: Colors[theme].primary_alt },
    nuclear: { ...baseStyle, backgroundColor: "transparent" },
    link: { ...baseStyle, backgroundColor: "transparent" },
    result: {
      ...baseStyle,
      backgroundColor: selected ? Colors[theme].primary : Colors[theme].fg_alt,
      borderRadius: 16,
      width: 64,
    },
  };

  const textStyles: Record<ButtonType, TextStyle> = {
    primary: baseTextStyle,
    nuclear: {
      ...baseTextStyle,
      fontSize: 16,
      fontWeight: "300",
      color: Colors[theme].error,
    },
    result: baseTextStyle,
    link: {
      ...baseTextStyle,
      fontSize: 20,
      textDecorationLine: "underline",
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyles[type], style]}
      activeOpacity={0.7}
    >
      {icon && (
        <FontAwesome5
          name={icon}
          size={20}
          color={textStyles[type].color ?? Colors[theme].text}
        />
      )}
      {title && <Text style={textStyles[type]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default TButton;
