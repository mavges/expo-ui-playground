import {
  cornerRadius,
  foregroundColor,
  frame,
} from "@expo/ui/build/swift-ui/modifiers";
import {
  Button,
  ColorPicker,
  ContentUnavailableView,
  DateTimePicker,
  DateTimePickerProps,
  DisclosureGroup,
  Form,
  Gauge,
  Host,
  HStack,
  Image,
  Picker,
  Section,
  Slider,
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

  const [color, setColor] = useState<string>("blue");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const options = ["$", "$$", "$$$", "$$$$"];
  const [sliderValue, setSliderValue] = useState<number>(0.5);
  const [switchValue, setSwitchValue] = useState<boolean>(true);

  const profileImageSizes = ["Large", "Medium", "Small"];
  const [disclosureGroupExpanded, setDisclosureGroupExpanded] =
    useState<boolean>(false);
  const [selectedProfileImageSizeIndex, setSelectedProfileImageSizeIndex] =
    useState<number>(0);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const displayOptions = ["compact", "graphical", "wheel"];
  const [selectedIndexPicker, setSelectedIndexPicker] = useState(0);

  const typeOptions = ["date", "hourAndMinute", "dateAndTime"];
  const [typeIndex, setTypeIndex] = useState(0);

  function getPickerType() {
    const str = displayOptions[selectedIndexPicker];
    return `${str.charAt(0).toUpperCase()}${str.slice(1)} picker`;
  }

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
            <Image systemName="person.fill" size={50} color={color} />

            <Text modifiers={[foregroundColor("red")]}>Beto</Text>
            <Text modifiers={[foregroundColor("red")]}>@betomoedano</Text>
          </VStack>
        </Section>
        <Section title="This is a section">
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}

          <DateTimePicker
            onDateSelected={(date) => {
              setSelectedDate(date);
            }}
            displayedComponents={
              typeOptions[
                typeIndex
              ] as DateTimePickerProps["displayedComponents"]
            }
            title="Select date"
            initialDate={selectedDate.toISOString()}
            variant={
              displayOptions[
                selectedIndexPicker
              ] as DateTimePickerProps["variant"]
            }
          />

          <Picker
            options={displayOptions}
            selectedIndex={selectedIndexPicker}
            onOptionSelected={({ nativeEvent: { index } }) => {
              setSelectedIndexPicker(index);
            }}
            variant="segmented"
          />

          <Picker
            options={typeOptions}
            selectedIndex={typeIndex}
            onOptionSelected={({ nativeEvent: { index } }) => {
              setTypeIndex(index);
            }}
            variant="segmented"
          />

          <VStack spacing={16}>
            <HStack spacing={16}>
              <Gauge
                current={{ value: sliderValue }}
                color={color}
                type="circular"
              />
              <Gauge
                current={{ value: sliderValue }}
                color={color}
                type="circularCapacity"
              />
              <Gauge
                current={{ value: sliderValue }}
                color={["red", "green", "blue"]}
                type="circularCapacity"
              />
            </HStack>

            <Gauge
              current={{ value: sliderValue }}
              color={color}
              type="default"
            />

            <Gauge
              current={{ value: sliderValue }}
              color={color}
              type="linear"
            />

            <Gauge
              current={{ value: sliderValue }}
              color={color}
              type="linearCapacity"
            />
          </VStack>

          <Slider value={sliderValue} onValueChange={setSliderValue} />

          <Picker
            label="Menu picker"
            options={options}
            selectedIndex={selectedIndex}
            onOptionSelected={({ nativeEvent: { index } }) => {
              setSelectedIndex(index);
            }}
            variant="menu"
          />

          <ColorPicker
            label="Select a color"
            selection={color}
            supportsOpacity
            onValueChanged={setColor}
          />

          <Switch
            value={switchValue}
            label="This is a switch"
            onValueChange={setSwitchValue}
          />

          <DisclosureGroup
            onStateChange={setDisclosureGroupExpanded}
            isExpanded={disclosureGroupExpanded}
            label="Show User Profile Details"
          >
            <Text>Name: John Doe</Text>
            <Text>Email: john.doe@example.com</Text>
            <Text>Role: Administrator</Text>
          </DisclosureGroup>

          <Picker
            label="Profile image size"
            options={profileImageSizes}
            selectedIndex={selectedProfileImageSizeIndex}
            onOptionSelected={({ nativeEvent: { index } }) => {
              setSelectedProfileImageSizeIndex(index);
            }}
            variant="menu"
          />

          <ContentUnavailableView
            title="No items"
            systemImage="exclamationmark.triangle"
            description="Add an item to get started"
          />

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
