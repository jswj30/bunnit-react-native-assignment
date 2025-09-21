import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import CalendarSection from "./components/CalendarSection";
import RecordSection from "./components/RecordSection";

export default function CalendarScreen() {
  const [calendarHeight, setCalendarHeight] = useState<number>(0);

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        {/* 달력 */}
        <CalendarSection setCalendarHeight={setCalendarHeight} />
        {/* 기록 */}
        <RecordSection calendarHeight={calendarHeight} />
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
  },
});
