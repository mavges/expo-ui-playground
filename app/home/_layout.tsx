import ContextMenuProfile from "@/components/ContextMenu.ios";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTransparent: true,
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
