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
          // headerBlurEffect: "light",
          headerLargeStyle: {
            backgroundColor: "transparent",
          },
          title: "Home",
          headerLeft: ({ tintColor }) => (
            <ContextMenuProfile />

            // <Pressable onPress={() => alert("test")}>
            //   <Host
            //     style={{ width: 35, height: 35 }}
            //     modifiers={[
            //       glassEffect({
            //         glass: { variant: "regular", interactive: false },
            //       }),
            //     ]}
            //   >
            //     <Image systemName="person.fill" color={tintColor} />
            //   </Host>
            // </Pressable>
          ),
          // headerRight: ({ tintColor }) => (
          //   <Pressable onPress={() => alert("test")}>
          //     <Host style={{ width: 40, height: 40 }}>
          //       <Image systemName="person.fill" color={tintColor} />
          //     </Host>
          //   </Pressable>
          // ),
        }}
      />
    </Stack>
  );
}
