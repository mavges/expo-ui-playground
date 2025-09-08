import { CircularProgress, Host } from "@expo/ui/swift-ui";
import { View, Text } from "react-native";

export default function BasicUsage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Host matchContents>
        <CircularProgress />
      </Host>
      <Text>Loading...</Text>
    </View>
  );
}
