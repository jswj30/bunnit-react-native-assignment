import React from "react";
import { StyleSheet, View } from "react-native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import CalendarSection from "./components/CalendarSection";
import RecordSection from "./components/RecordSection";

export default function CalendarScreen() {
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        {/* 달력 */}
        <CalendarSection />
        {/* 기록 */}
        <RecordSection />
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
