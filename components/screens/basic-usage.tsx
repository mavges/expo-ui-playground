import {
  background,
  border,
  fixedSize,
  frame,
  padding,
} from "@expo/ui/build/swift-ui/modifiers";
import {
  CircularProgress,
  Text as ExpoUIText,
  Host,
  HStack,
  LinearProgress,
  Slider,
  VStack,
} from "@expo/ui/swift-ui";
import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, Text } from "react-native";

const fromSadToHappy = [
  "😊",
  "🙂",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
];

const fromSadToHappyStrings = [
  "Sad",
  "A bit sad",
  "Neutral",
  "Somewhat happy",
  "Happy",
  "Very happy",
  "Excited",
  "Overjoyed",
  "Ecstatic",
  "Blissful",
];

export default function BasicUsage() {
  const [mood, setMood] = useState("happy");
  const [emoji, setEmoji] = useState("😊");

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16 }}
    >
      <Link href="/basic/modifiers" style={{ marginBottom: 0 }}>
        Go to Modifiers
      </Link>
      <Host matchContents>
        <CircularProgress
          color={"orange"}
          modifiers={[fixedSize(true), padding({ vertical: 16 })]}
        />
      </Host>
      <Text>Loading...</Text>

      <Host matchContents style={{ marginTop: 16 }}>
        <VStack
          spacing={32}
          modifiers={[
            border({ color: "#ff0000", width: 1 }),
            background("#fff"),
          ]}
        >
          <HStack
            spacing={32}
            modifiers={[padding({ all: 16 }), frame({ height: 100 })]}
          >
            <VStack spacing={12}>
              <ExpoUIText size={48}>{emoji}</ExpoUIText>
              {/* <ExpoUIText>{mood}</ExpoUIText> */}
            </VStack>
            <Slider
              steps={fromSadToHappyStrings.length}
              max={fromSadToHappyStrings.length - 1}
              value={fromSadToHappyStrings.indexOf(mood)}
              onValueChange={(event: number) => {
                const roundedValue = Math.round(event);
                setEmoji(fromSadToHappy[roundedValue]);
                setMood(fromSadToHappyStrings[roundedValue]);
              }}
            />
          </HStack>

          <LinearProgress
            progress={0.5}
            modifiers={[padding({ bottom: 16 })]}
          />
          <LinearProgress
            color="orange"
            progress={0.7}
            modifiers={[padding({ bottom: 16 })]}
          />
        </VStack>
      </Host>
    </ScrollView>
  );
}
