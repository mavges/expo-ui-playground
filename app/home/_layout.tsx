import ContextMenuProfile from "@/components/ContextMenu.ios";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  const theme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTransparent: true,
          headerTintColor: theme === "dark" ? "white" : "black",
          headerLargeStyle: {
            backgroundColor: "transparent",
          },
          title: "Home",
          headerLeft: () => <ContextMenuProfile />,
        }}
      />
    </Stack>
  );
}
