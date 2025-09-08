import {
  cornerRadius,
  foregroundColor,
  frame,
} from "@expo/ui/build/swift-ui/modifiers";
import {
  Button,
  ChartDataPoint,
  ChartType,
  ColorPicker,
  ContentUnavailableView,
  ContextMenu,
  DateTimePicker,
  DateTimePickerProps,
  DisclosureGroup,
  Form,
  Gauge,
  Host,
  HStack,
  Picker,
  Section,
  Slider,
  Submenu,
  Switch,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { Image as ExpoImage } from "expo-image";
import React, { createContext, ReactNode, use, useState } from "react";

// Types
interface Task {
  id: number;
  title: string;
  description: string;
  emoji: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: Date;
  createdAt: Date;
}

interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  theme: string;
  profileImageSize: "small" | "medium" | "large";
}

interface AppSettings {
  notifications: boolean;
  autoSave: boolean;
  theme: "light" | "dark" | "auto";
  language: string;
}

interface AppState {
  // User Profile
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;

  // UI State
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  taskFilter: "all" | "pending" | "completed";
  setTaskFilter: (filter: "all" | "pending" | "completed") => void;

  // Dashboard metrics
  productivityScore: number;
  setProductivityScore: (score: number) => void;
  focusLevel: number;
  setFocusLevel: (level: number) => void;

  // Chart data and settings
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
  chartData: ChartDataPoint[];
  setChartData: (data: ChartDataPoint[]) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  showLegend: boolean;
  setShowLegend: (show: boolean) => void;

  // Context menu states
  contextMenuStates: Record<string, boolean>;
  updateContextMenuState: (key: string, value: boolean) => void;
}

// Context
const AppContext = createContext<AppState | null>(null);

// Initial data
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Finish the Q1 project proposal for the design system",
    emoji: "📋",
    completed: false,
    priority: "high",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 2,
    title: "Review UI components",
    description: "Review and test all new UI components in the library",
    emoji: "🎨",
    completed: true,
    priority: "medium",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: 3,
    title: "Update documentation",
    description: "Update the component documentation with new examples",
    emoji: "📚",
    completed: false,
    priority: "low",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: 4,
    title: "Team standup meeting",
    description: "Weekly team standup and planning session",
    emoji: "👥",
    completed: false,
    priority: "medium",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 8),
    createdAt: new Date(),
  },
];

const initialProfile: UserProfile = {
  name: "Beto",
  username: "@betomoedano",
  avatar: "person.fill",
  theme: "#4A90E2",
  profileImageSize: "medium",
};

const initialSettings: AppSettings = {
  notifications: true,
  autoSave: true,
  theme: "auto",
  language: "en",
};

// Chart data sets
const productivityChartData: ChartDataPoint[] = [
  { x: "Mon", y: 75, color: "#4A90E2" },
  { x: "Tue", y: 85, color: "#50C8D8" },
  { x: "Wed", y: 65, color: "#5AD67D" },
  { x: "Thu", y: 92, color: "#F5D76E" },
  { x: "Fri", y: 88, color: "#FF8C42" },
  { x: "Sat", y: 70, color: "#FF6B6B" },
  { x: "Sun", y: 60, color: "#D63384" },
];

const taskCompletionData: ChartDataPoint[] = [
  { x: "Week 1", y: 12 },
  { x: "Week 2", y: 18 },
  { x: "Week 3", y: 15 },
  { x: "Week 4", y: 24 },
];

const priorityDistribution: ChartDataPoint[] = [
  { x: "High", y: 35, color: "#FF6B6B" },
  { x: "Medium", y: 45, color: "#FFD93D" },
  { x: "Low", y: 20, color: "#6BCF7F" },
];

const initialContextMenuStates = {
  "Show Completed Tasks": true,
  "Auto Refresh": false,
  Notifications: true,
  "Dark Mode": false,
};

// Provider component
function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [settings, setSettings] = useState<AppSettings>(initialSettings);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskFilter, setTaskFilter] = useState<"all" | "pending" | "completed">(
    "all",
  );
  const [productivityScore, setProductivityScore] = useState(0.75);
  const [focusLevel, setFocusLevel] = useState(0.6);
  const [chartType, setChartType] = useState<ChartType>("line");
  const [chartData, setChartData] = useState<ChartDataPoint[]>(
    productivityChartData,
  );
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [contextMenuStates, setContextMenuStates] = useState(
    initialContextMenuStates,
  );

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const updateContextMenuState = (key: string, value: boolean) => {
    setContextMenuStates((prev) => ({ ...prev, [key]: value }));
  };

  const value: AppState = {
    profile,
    updateProfile,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    settings,
    updateSettings,
    selectedDate,
    setSelectedDate,
    taskFilter,
    setTaskFilter,
    productivityScore,
    setProductivityScore,
    focusLevel,
    setFocusLevel,
    chartType,
    setChartType,
    chartData,
    setChartData,
    showGrid,
    setShowGrid,
    showLegend,
    setShowLegend,
    contextMenuStates,
    updateContextMenuState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Component sections
function ProfileSection() {
  const { profile, updateProfile } = use(AppContext) as AppState;
  const [profileExpanded, setProfileExpanded] = useState(false);

  const profileSizes = ["small", "medium", "large"];
  const profileSizeIndex = profileSizes.indexOf(profile.profileImageSize);

  const imageSize =
    profile.profileImageSize === "large"
      ? 80
      : profile.profileImageSize === "medium"
        ? 60
        : 40;

  return (
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
          <Text modifiers={[foregroundColor("gray")]}>{profile.username}</Text>
        </VStack>
      </HStack>

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
  );
}

function ButtonsSection() {
  return (
    <Section title="🔘 Buttons">
      <VStack spacing={12}>
        <Button variant="default">Default</Button>
        <Button variant="bordered">Bordered</Button>
        <Button variant="plain">Plain</Button>
        <Button variant="glass">Glass</Button>
        <Button variant="glassProminent">Glass Prominent</Button>
        <Button variant="borderedProminent">Bordered Prominent</Button>
        <Button variant="borderless">Borderless</Button>
      </VStack>
    </Section>
  );
}

function DashboardSection() {
  const {
    tasks,
    productivityScore,
    setProductivityScore,
    focusLevel,
    setFocusLevel,
  } = use(AppContext) as AppState;

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;

  const highPriorityTasks = tasks.filter(
    (t) => t.priority === "high" && !t.completed,
  ).length;
  const urgentTasksRate = totalTasks > 0 ? highPriorityTasks / totalTasks : 0;

  return (
    <Section title="📊 Performance Dashboard">
      <VStack spacing={20}>
        {/* Task Metrics Row */}
        <VStack spacing={12}>
          <Text size={16}>Task Completion Metrics</Text>
          <HStack spacing={16}>
            <Gauge
              current={{
                value: completionRate,
                label: `${Math.round(completionRate * 100)}%`,
              }}
              modifiers={[frame({ width: 100, height: 100 })]}
              color="green"
              type="circular"
            />
            <VStack spacing={4} alignment="leading">
              <Text size={14}>Completion Rate</Text>
              <Text size={12} modifiers={[foregroundColor("gray")]}>
                {`${completedTasks} of ${totalTasks} completed`}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Gauge Variants Showcase */}
        <VStack spacing={12}>
          <Text size={16}>Gauge Component Variants</Text>

          {/* Circular Gauges */}
          <HStack spacing={16}>
            <VStack spacing={8} alignment="center">
              <Gauge
                current={{
                  value: productivityScore,
                  label: `${Math.round(productivityScore * 100)}%`,
                }}
                modifiers={[frame({ width: 80, height: 80 })]}
                color="blue"
                type="circular"
              />
              <Text size={12}>Circular</Text>
            </VStack>

            <VStack spacing={8} alignment="center">
              <Gauge
                current={{
                  value: focusLevel,
                  label: `${Math.round(focusLevel * 100)}%`,
                }}
                modifiers={[frame({ width: 80, height: 80 })]}
                color="purple"
                type="circularCapacity"
              />
              <Text size={12}>Circular Capacity</Text>
            </VStack>

            <VStack spacing={8} alignment="center">
              <Gauge
                current={{
                  value: urgentTasksRate,
                  label: `${highPriorityTasks}`,
                }}
                modifiers={[frame({ width: 80, height: 80 })]}
                color={["red", "orange", "green"]}
                type="circularCapacity"
              />
              <Text size={12}>Multi-Color</Text>
            </VStack>
          </HStack>

          {/* Linear Gauges */}
          <VStack spacing={8}>
            <Text size={14}>Linear Gauge Types</Text>

            <VStack spacing={4}>
              <Text size={12} modifiers={[foregroundColor("gray")]}>
                Default Linear
              </Text>
              <Gauge
                current={{ value: completionRate }}
                color="green"
                type="default"
              />
            </VStack>

            <VStack spacing={4}>
              <Text size={12} modifiers={[foregroundColor("gray")]}>
                Linear
              </Text>
              <Gauge
                current={{ value: productivityScore }}
                color="blue"
                type="linear"
              />
            </VStack>

            <VStack spacing={4}>
              <Text size={12} modifiers={[foregroundColor("gray")]}>
                Linear Capacity
              </Text>
              <Gauge
                current={{ value: focusLevel }}
                color="purple"
                type="linearCapacity"
              />
            </VStack>

            <VStack spacing={4}>
              <Text size={12} modifiers={[foregroundColor("gray")]}>
                Gradient Linear
              </Text>
              <Gauge
                current={{ value: (productivityScore + focusLevel) / 2 }}
                color={["red", "yellow", "green"]}
                type="linear"
              />
            </VStack>
          </VStack>
        </VStack>

        {/* Interactive Sliders */}
        <VStack spacing={12}>
          <Text size={16}>Interactive Controls</Text>

          <VStack spacing={8}>
            <HStack spacing={12} alignment="center">
              <Text size={14}>Productivity Score:</Text>
              <Text size={14} modifiers={[foregroundColor("blue")]}>
                {`${Math.round(productivityScore * 100)}%`}
              </Text>
            </HStack>
            <Slider
              value={productivityScore}
              onValueChange={setProductivityScore}
            />
          </VStack>

          <VStack spacing={8}>
            <HStack spacing={12} alignment="center">
              <Text size={14}>Focus Level:</Text>
              <Text size={14} modifiers={[foregroundColor("purple")]}>
                {`${Math.round(focusLevel * 100)}%`}
              </Text>
            </HStack>
            <Slider value={focusLevel} onValueChange={setFocusLevel} />
          </VStack>
        </VStack>

        {/* Action Buttons */}
        <VStack spacing={8}>
          <Text size={16}>Quick Actions</Text>
          <HStack spacing={12}>
            <Button
              onPress={() => {
                setProductivityScore(Math.random());
                setFocusLevel(Math.random());
              }}
              systemImage="shuffle"
            >
              Randomize
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Section>
  );
}

function TaskManagementSection() {
  const { tasks, toggleTask, taskFilter, setTaskFilter } = use(
    AppContext,
  ) as AppState;

  const filterOptions = ["all", "pending", "completed"];
  const filterIndex = filterOptions.indexOf(taskFilter);

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "all") return true;
    if (taskFilter === "pending") return !task.completed;
    if (taskFilter === "completed") return task.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Section title="✅ Task Management">
      <Picker
        label="Filter Tasks"
        options={filterOptions}
        selectedIndex={filterIndex}
        onOptionSelected={({ nativeEvent: { index } }) => {
          setTaskFilter(
            filterOptions[index] as "all" | "pending" | "completed",
          );
        }}
        variant="segmented"
      />

      {filteredTasks.length === 0 ? (
        <ContentUnavailableView
          title="No tasks found"
          systemImage="checkmark.circle"
          description={`No ${taskFilter} tasks at the moment`}
        />
      ) : (
        <VStack spacing={8}>
          {filteredTasks.map((task) => (
            <HStack key={task.id} spacing={12} alignment="center">
              <Text size={24}>{task.emoji}</Text>
              <VStack spacing={4} alignment="leading">
                <HStack spacing={8} alignment="center">
                  <Text
                    size={16}
                    modifiers={task.completed ? [foregroundColor("gray")] : []}
                  >
                    {task.title}
                  </Text>
                  <Text
                    size={12}
                    modifiers={[
                      foregroundColor(getPriorityColor(task.priority)),
                    ]}
                  >
                    {task.priority.toUpperCase()}
                  </Text>
                </HStack>
                <Text size={14} modifiers={[foregroundColor("gray")]}>
                  {task.description}
                </Text>
                <Text size={12} modifiers={[foregroundColor("gray")]}>
                  {`Due: ${task.dueDate.toLocaleDateString()}`}
                </Text>
              </VStack>
              <Switch
                value={task.completed}
                onValueChange={() => toggleTask(task.id)}
              />
            </HStack>
          ))}
        </VStack>
      )}
    </Section>
  );
}

function DateTimeSection() {
  const { selectedDate, setSelectedDate } = use(AppContext) as AppState;
  const [pickerType, setPickerType] = useState(0);
  const [displayStyle, setDisplayStyle] = useState(0);

  const displayOptions = ["compact", "graphical", "wheel"];
  const typeOptions = ["date", "hourAndMinute", "dateAndTime"];

  return (
    <Section title="📅 Date & Time Management">
      <Text
        size={16}
      >{`Current Selection: ${selectedDate.toLocaleString()}`}</Text>

      <Picker
        label="Display Style"
        options={displayOptions}
        selectedIndex={displayStyle}
        onOptionSelected={({ nativeEvent: { index } }) => {
          setDisplayStyle(index);
        }}
        variant="segmented"
      />

      <Picker
        label="Picker Type"
        options={typeOptions}
        selectedIndex={pickerType}
        onOptionSelected={({ nativeEvent: { index } }) => {
          setPickerType(index);
        }}
        variant="segmented"
      />

      <DateTimePicker
        onDateSelected={(date) => {
          setSelectedDate(date);
        }}
        displayedComponents={
          typeOptions[pickerType] as DateTimePickerProps["displayedComponents"]
        }
        title="Select Date & Time"
        initialDate={selectedDate.toISOString()}
        variant={displayOptions[displayStyle] as DateTimePickerProps["variant"]}
      />
    </Section>
  );
}

function SettingsSection() {
  const { settings, updateSettings } = use(AppContext) as AppState;
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const themeOptions = ["light", "dark", "auto"];
  const themeIndex = themeOptions.indexOf(settings.theme);

  const languageOptions = ["en", "es", "fr", "de"];
  const languageIndex = languageOptions.indexOf(settings.language);

  return (
    <Section title="⚙️ App Settings">
      <Switch
        value={settings.notifications}
        label="Push Notifications"
        onValueChange={(value) => updateSettings({ notifications: value })}
      />

      <Switch
        value={settings.autoSave}
        label="Auto-save Changes"
        onValueChange={(value) => updateSettings({ autoSave: value })}
      />

      <DisclosureGroup
        onStateChange={setSettingsExpanded}
        isExpanded={settingsExpanded}
        label="Advanced Settings"
      >
        <Picker
          label="App Theme"
          options={themeOptions}
          selectedIndex={themeIndex}
          onOptionSelected={({ nativeEvent: { index } }) => {
            updateSettings({
              theme: themeOptions[index] as "light" | "dark" | "auto",
            });
          }}
          variant="menu"
        />

        <Picker
          label="Language"
          options={languageOptions}
          selectedIndex={languageIndex}
          onOptionSelected={({ nativeEvent: { index } }) => {
            updateSettings({ language: languageOptions[index] });
          }}
          variant="menu"
        />
      </DisclosureGroup>
    </Section>
  );
}

function ContextMenuSection() {
  const { contextMenuStates, updateContextMenuState, tasks, toggleTask } = use(
    AppContext,
  ) as AppState;

  const menuOptions = [
    {
      systemImage: "info.circle",
      title: "Task Overview",
      type: "button",
    },
    {
      title: "Filter Tasks",
      systemImage: "line.3.horizontal.decrease.circle",
      type: "submenu",
      items: [
        {
          title: "Show All",
          systemImage: "list.bullet",
          type: "button",
        },
        {
          title: "High Priority Only",
          systemImage: "exclamationmark.triangle.fill",
          type: "button",
        },
        {
          title: "Due Today",
          systemImage: "calendar.badge.clock",
          type: "button",
        },
        {
          title: "Overdue",
          systemImage: "calendar.badge.exclamationmark",
          type: "button",
        },
      ],
    },
    {
      title: "Show Completed Tasks",
      systemImage: "checkmark.circle",
      type: "switch",
      value: contextMenuStates["Show Completed Tasks"],
    },
    {
      title: "View Options",
      systemImage: "eye",
      type: "submenu",
      items: [
        {
          title: "Auto Refresh",
          systemImage: "arrow.clockwise",
          type: "switch",
          value: contextMenuStates["Auto Refresh"],
        },
        {
          title: "Notifications",
          systemImage: "bell",
          type: "switch",
          value: contextMenuStates["Notifications"],
        },
        {
          title: "Advanced Settings",
          systemImage: "gear",
          type: "submenu",
          items: [
            {
              title: "Dark Mode",
              systemImage: "moon.fill",
              type: "switch",
              value: contextMenuStates["Dark Mode"],
            },
            {
              title: "Reset All Settings",
              systemImage: "arrow.clockwise.circle",
              type: "button",
              destructive: true,
            },
            {
              title: "Export Data",
              systemImage: "square.and.arrow.up",
              type: "button",
            },
          ],
        },
      ],
    },
    {
      title: "Quick Actions",
      systemImage: "bolt",
      type: "submenu",
      items: [
        {
          title: "Mark All Complete",
          systemImage: "checkmark.circle.fill",
          type: "button",
        },
        {
          title: "Clear Completed",
          systemImage: "trash",
          type: "button",
          destructive: true,
        },
      ],
    },
    {
      title: "Help & Support",
      systemImage: "questionmark.circle",
      type: "button",
    },
  ];

  const renderMenuOption = (
    option: any,
    index: number,
  ): React.ReactElement | null => {
    switch (option.type) {
      case "button":
        return (
          <Button
            key={index}
            systemImage={option.systemImage}
            role={option.destructive ? "destructive" : undefined}
            onPress={() => {
              console.log(`Context menu action: ${option.title}`);
              // Handle specific actions
              if (option.title === "Mark All Complete") {
                tasks
                  .filter((t) => !t.completed)
                  .forEach((task) => toggleTask(task.id));
              }
            }}
          >
            {option.title}
          </Button>
        );

      case "switch":
        return (
          <Switch
            key={index}
            value={option.value}
            label={option.title}
            variant="checkbox"
            onValueChange={(value) => {
              updateContextMenuState(option.title, value);
            }}
          />
        );

      case "submenu":
        return (
          <Submenu
            key={index}
            button={
              <Button systemImage={option.systemImage}>{option.title}</Button>
            }
          >
            {option.items?.map((subItem: any, subIndex: number) =>
              renderMenuOption(subItem, subIndex),
            )}
          </Submenu>
        );

      default:
        return null;
    }
  };

  return (
    <Section title="🔗 Context Menu & Actions">
      <VStack spacing={16}>
        <Text size={16}>Interactive Context Menu</Text>

        <VStack spacing={12}>
          <Text size={14}>Menu Demo</Text>
          <Text size={12} modifiers={[foregroundColor("gray")]}>
            Long press the menu button below to see nested context menu options
          </Text>

          <HStack spacing={16} alignment="center">
            <Host style={{ width: 120, height: 50 }}>
              <ContextMenu>
                <ContextMenu.Items>
                  {menuOptions.map((option, index) =>
                    renderMenuOption(option, index),
                  )}
                </ContextMenu.Items>
                <ContextMenu.Trigger>
                  <Button systemImage="ellipsis.circle.fill">
                    Menu Options
                  </Button>
                </ContextMenu.Trigger>
              </ContextMenu>
            </Host>

            <VStack spacing={4} alignment="leading">
              <Text size={12} modifiers={[foregroundColor("gray")]}>
                Context Menu Features:
              </Text>
              <Text size={10} modifiers={[foregroundColor("gray")]}>
                • Nested submenus
              </Text>
              <Text size={10} modifiers={[foregroundColor("gray")]}>
                • Toggle switches
              </Text>
              <Text size={10} modifiers={[foregroundColor("gray")]}>
                • Destructive actions
              </Text>
              <Text size={10} modifiers={[foregroundColor("gray")]}>
                • System icons
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </Section>
  );
}

// Main component
function AppContent() {
  return (
    <Host style={{ flex: 1 }}>
      <Form>
        <ProfileSection />
        <ButtonsSection />
        <DashboardSection />
        <TaskManagementSection />
        <ContextMenuSection />
        <DateTimeSection />
        <SettingsSection />
      </Form>
    </Host>
  );
}

export default function ModifiersScreen() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
