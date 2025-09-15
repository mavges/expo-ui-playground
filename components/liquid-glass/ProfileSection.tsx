import {
  background,
  clipShape,
  cornerRadius,
  foregroundColor,
  frame,
  glassEffect,
} from "@expo/ui/swift-ui/modifiers";
import {
  Button,
  ColorPicker,
  DisclosureGroup,
  Image as ExpoUIImage,
  Group,
  HStack,
  Image,
  Picker,
  Section,
  Spacer,
  Switch,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { Image as ExpoImage } from "expo-image";
import { Link } from "expo-router";
import React, { use, useState } from "react";
import { AppContext } from "./AppContext";
import { AppState } from "./types";

export function ProfileSection() {
  const { profile, updateProfile } = use(AppContext) as AppState;
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [isAirplaneMode, setIsAirplaneMode] = useState(false);

  const profileSizes = ["small", "medium", "large"];
  const profileSizeIndex = profileSizes.indexOf(profile.profileImageSize);

  const imageSize =
    profile.profileImageSize === "large"
      ? 80
      : profile.profileImageSize === "medium"
      ? 60
      : 40;

  return (
    <>
      <Section title="👤 User Profile">
        <HStack spacing={16}>
          <HStack
            modifiers={[
              frame({ width: imageSize, height: imageSize }),
              cornerRadius(100),
            ]}
          >
            <ExpoImage
              source={{ uri: "https://github.com/betomoedano.png" }}
              style={{ width: imageSize, height: imageSize }}
              contentFit="fill"
            />
          </HStack>

          <VStack alignment="leading">
            <Text
              modifiers={[foregroundColor(profile.theme)]}
              color={profile.theme}
              size={22}
              weight="bold"
            >
              {profile.name}
            </Text>
            <Text modifiers={[foregroundColor("gray")]}>
              {profile.username}
            </Text>
          </VStack>
        </HStack>

        <HStack spacing={8}>
          <ExpoUIImage
            systemName="airplane"
            color="white"
            size={18}
            modifiers={[
              frame({ width: 28, height: 28 }),
              background("#ffa500"),
              clipShape("roundedRectangle"),
            ]}
          />
          <Text>Airplane Mode</Text>
          <Spacer />
          <Switch value={isAirplaneMode} onValueChange={setIsAirplaneMode} />
        </HStack>

        <Link href="/basic/modifiers" asChild>
          <Button>
            <HStack spacing={8}>
              <ExpoUIImage
                systemName="wifi"
                color="white"
                size={18}
                modifiers={[
                  frame({ width: 28, height: 28 }),
                  background("#007aff"),
                  clipShape("roundedRectangle"),
                ]}
              />
              <Text color="primary">Wi-Fi</Text>
              <Spacer />
              {/* <ExpoUIImage
              systemName="chevron.right"
              size={14}
              color="secondary"
            /> */}
            </HStack>
          </Button>
        </Link>

        <Button variant="borderless" onPress={() => alert("This is a button")}>
          Borderless button
        </Button>

        <Button onPress={() => alert("This is a button")}>
          Regular button
        </Button>

        <DisclosureGroup
          onStateChange={setProfileExpanded}
          isExpanded={profileExpanded}
          label="Profile Settings"
        >
          <Picker
            label="Profile Image Size"
            options={profileSizes}
            selectedIndex={profileSizeIndex}
            onOptionSelected={({ nativeEvent: { index } }) => {
              updateProfile({
                profileImageSize: profileSizes[index] as
                  | "small"
                  | "medium"
                  | "large",
              });
            }}
            variant="menu"
          />

          <ColorPicker
            label="Theme Color"
            selection={profile.theme}
            supportsOpacity={false}
            onValueChanged={(color) => updateProfile({ theme: color })}
          />
        </DisclosureGroup>
      </Section>

      <Group
        modifiers={[
          glassEffect({ glass: { variant: "regular", interactive: true } }),
          frame({ width: 100, height: 100 }),
        ]}
      >
        <Image
          systemName="applelogo"
          // onPress={() => alert("This is an image")}
          size={50}
        />
      </Group>
      <Button variant="borderless" onPress={() => alert("This is a button")}>
        Borderless button
      </Button>
    </>
  );
}
