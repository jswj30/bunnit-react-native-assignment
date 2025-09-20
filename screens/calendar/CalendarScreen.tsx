import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";

export default function CalendarScreen() {
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
