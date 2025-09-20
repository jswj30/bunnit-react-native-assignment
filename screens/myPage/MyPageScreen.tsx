import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";

export default function MyPageScreen() {
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Text>My page</Text>
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
