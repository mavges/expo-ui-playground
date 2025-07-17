import { Button } from "@expo/ui/swift-ui";
import { Image } from "expo-image";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const images = [
  "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1677622678379-115b35bf27e8?q=80&w=3578&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1666777247416-ee7a95235559?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function ButtonScreen() {
  const [imageIdx, setImageIdx] = React.useState(0);
  return (
    <>
      <Image
        style={StyleSheet.absoluteFill}
        source={images[imageIdx]}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          width: "100%",
          padding: 16,
          gap: 16,
        }}
      >
        <Button variant="glass">Glass button</Button>
        <Button variant="glass">Glass button</Button>
        <Button variant="glass">Glass button</Button>
        <Button variant="glass">Glass button</Button>
        <Button variant="glass">Glass button</Button>
        <Button variant="glass">Glass button</Button>
        <Button variant="glass">Glass button</Button>
        <Button variant="glass">Glass button</Button>
        <View
          style={{ flexDirection: "row", gap: 16, justifyContent: "center" }}
        >
          <Button
            variant="glassProminent"
            systemImage="chevron.left"
            onPress={() => setImageIdx(imageIdx - 1)}
          >
            Prev
          </Button>
          <Button
            variant="glassProminent"
            systemImage="chevron.right"
            onPress={() => setImageIdx(imageIdx + 1)}
          >
            Next
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
