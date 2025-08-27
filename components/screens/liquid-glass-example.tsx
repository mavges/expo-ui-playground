import {
  cornerRadius,
  foregroundColor,
  frame,
} from "@expo/ui/build/swift-ui/modifiers";
import {
  Button,
  Form,
  Host,
  HStack,
  Image,
  Section,
  Switch,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { useState } from "react";
import { useWindowDimensions } from "react-native";

const initialItems = [
  {
    id: 1,
    title: "Wash the dishes",
    description: "Wash the dishes",
    emoji: "🍽️",
    status: "pending",
    priority: 1,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Buy groceries",
    description: "Buy groceries",
    emoji: "🛒",
    status: "pending",
    priority: 2,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(),
  },
];

const Item = ({ item }: { item: (typeof initialItems)[number] }) => {
  return <Text>{`${item.emoji} ${item.title}`}</Text>;
};

export default function ModifiersScreen() {
  const [items, setItems] = useState(initialItems);
  const { width } = useWindowDimensions();
  return (
    <Host style={{ flex: 1 }}>
      <Form>
        <Section
          title="Profile"
          // modifiers={[clipShape("circle")]}
        >
          <VStack
            spacing={16}
            alignment="center"
            modifiers={[
              frame({ width }),
              // background("#667eea"),
              cornerRadius(12),
              // shadow({ radius: 4, y: 2, color: "#ead", x: 2 }),
              // scaleEffect(0.9),
              // glassEffect({
              //   glass: {
              //     variant: "regular",
              //     interactive: true,
              //   },
              // }),
            ]}
          >
            <Image systemName="person.fill" size={50} />
            <Text modifiers={[foregroundColor("red")]}>Beto</Text>
            <Text modifiers={[foregroundColor("red")]}>@betomoedano</Text>
          </VStack>
        </Section>
        <Section title="This is a section">
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}

          <HStack spacing={16}>
            <Text size={17} modifiers={[]}>
              Some text!
            </Text>
            <Button onPress={() => alert("Clicked!")} systemImage="clipboard">
              Copy
            </Button>
          </HStack>
          <Switch
            value={false}
            label="This is a switch"
            onValueChange={() => {}}
          />
        </Section>

        <Section title="This is a section">
          <Section title="This is a section">
            <Text>This is a text</Text>
          </Section>
        </Section>
      </Form>
    </Host>
  );
}
