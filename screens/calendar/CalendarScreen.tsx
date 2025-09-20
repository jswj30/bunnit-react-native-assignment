import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import CalendarSection from "./components/CalendarSection";

export default function CalendarScreen() {
  return (
    <CustomSafeAreaView>
      <ScrollView style={styles.container}>
        {/* 달력 */}
        <CalendarSection />
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
