import { Platform, View, Text as RNText } from 'react-native';

const isWeb = Platform.OS === 'web';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const SwiftUI = isWeb ? {} : require('@expo/ui/swift-ui');

export const DateTimePicker = SwiftUI.DateTimePicker ?? (() => null);
export const Picker = SwiftUI.Picker ?? View;
export const Section = SwiftUI.Section ?? View;
export const Text = SwiftUI.Text ?? RNText;
export const DisclosureGroup = SwiftUI.DisclosureGroup ?? View;
export const Switch = SwiftUI.Switch ?? View;
export const Button = SwiftUI.Button ?? View;
export const ContextMenu = SwiftUI.ContextMenu ?? View;
export const Submenu = SwiftUI.Submenu ?? View;
export const Host = SwiftUI.Host ?? View;
export const HStack = SwiftUI.HStack ?? View;
export const VStack = SwiftUI.VStack ?? View;
export const Group = SwiftUI.Group ?? View;
export const ContentUnavailableView = SwiftUI.ContentUnavailableView ?? View;
export const ColorPicker = SwiftUI.ColorPicker ?? View;
export const Image = SwiftUI.Image ?? View;
export const Spacer = SwiftUI.Spacer ?? View;
export const Gauge = SwiftUI.Gauge ?? View;
export const Slider = SwiftUI.Slider ?? View;
export const CircularProgress = SwiftUI.CircularProgress ?? View;
export const LinearProgress = SwiftUI.LinearProgress ?? View;
export const Form = SwiftUI.Form ?? View;
export const Chart = SwiftUI.Chart ?? View;

export type { DateTimePickerProps } from '@expo/ui/src/swift-ui/DatePicker';
export type {
  ChartDataPoint,
  ChartType,
  LineChartStyle,
  PointChartStyle,
  PointStyle,
} from '@expo/ui/src/swift-ui/Chart';
