import { Host, Image } from "@expo/ui/swift-ui";
import { Stack } from "expo-router";
import { Pressable } from "react-native";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "light",
          title: "Home",
          headerRight: ({ tintColor }) => (
            <Pressable onPress={() => alert("test")}>
              <Host style={{ width: 40, height: 40 }}>
                <Image systemName="person.fill" color={tintColor} />
              </Host>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
