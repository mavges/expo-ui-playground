import { Host, Text } from "@expo/ui/swift-ui";
import {
  accessibilityLabel,
  background,
  blur,
  border,
  brightness,
  cornerRadius,
  foregroundColor,
  offset,
  onTapGesture,
  padding,
  rotationEffect,
  saturation,
  scaleEffect,
  shadow,
} from "@expo/ui/swift-ui/modifiers";
import { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ModifiersScreen() {
  const [playSounds, setPlaySounds] = useState(true);
  const dimensions = useWindowDimensions();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Host matchContents>
      <Text
        size={22}
        weight="heavy"
        design="serif"
        modifiers={[
          background(
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
          ),
          cornerRadius(25),
          padding({ all: 25 }),
          shadow({ radius: 20, x: 0, y: 10, color: "#667eea40" }),
          blur(0.4),
          brightness(0.15),
          saturation(1.7),
          scaleEffect(1.03),
          rotationEffect(1),
          offset({ x: 0, y: -2 }),
          border({ color: "rgba(255, 255, 255, 0.3)", width: 1 }),
          foregroundColor("#FFFFFF"),
          accessibilityLabel(
            "Ultimate masterpiece card with all visual effects"
          ),
          onTapGesture(() =>
            alert("🎨 You've discovered the ultimate modifier masterpiece!")
          ),
        ]}
      >
        ULTIMATE MASTERPIECE
      </Text>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  uiView: {
    backgroundColor: "#90EE90",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  uiViewText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
