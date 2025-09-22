import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { defaultColor } from "../../modules/defaultColor";
import CalendarSection from "./components/CalendarSection";
import RecordSection from "./components/RecordSection";

export default function CalendarScreen() {
  const [calendarHeight, setCalendarHeight] = useState<number>(0);

  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const defaultValue = height - top - tabBarHeight;

  const RecordHeight = useSharedValue<number>(defaultValue);
  const startHeight = useSharedValue<number>(0);

  return (
    <View style={styles.container}>
      {/* 달력 */}
      <CalendarSection
        setCalendarHeight={setCalendarHeight}
        RecordHeight={RecordHeight}
        defaultValue={defaultValue}
      />
      {/* 기록 */}
      <RecordSection
        calendarHeight={calendarHeight}
        RecordHeight={RecordHeight}
        startHeight={startHeight}
        defaultValue={defaultValue}
        width={width}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: defaultColor.white,
  },
});
