import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";

export default function HomeScreen() {
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
