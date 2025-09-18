import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MyPageScreen() {
  return (
    <View style={styles.container}>
      <Text>My page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
