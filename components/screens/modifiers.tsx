import { Host, Text } from "../swift-ui";
import { glassEffect, padding } from "@expo/ui/swift-ui/modifiers";
import { MeshGradientView } from "expo-mesh-gradient";
import { View } from "react-native";

export default function Modifiers() {
  return (
    <View style={{ flex: 1 }}>
      <MeshGradientView
        style={{ flex: 1 }}
        columns={3}
        rows={3}
        colors={[
          "red",
          "purple",
          "indigo",
          "orange",
          "white",
          "blue",
          "yellow",
          "green",
          "cyan",
        ]}
        points={[
          [0.0, 0.0],
          [0.5, 0.0],
          [1.0, 0.0],
          [0.0, 0.5],
          [0.5, 0.5],
          [1.0, 0.5],
          [0.0, 1.0],
          [0.5, 1.0],
          [1.0, 1.0],
        ]}
      />
      <Host
        style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Text
          size={32}
          modifiers={[
            padding({
              all: 16,
            }),
            glassEffect({
              glass: {
                variant: "clear",
              },
            }),
          ]}
        >
          Glass effect text
        </Text>
      </Host>
    </View>
  );
}
