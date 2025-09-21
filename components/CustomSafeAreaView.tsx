import { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultColor } from "../modules/defaultColor";

export default function CustomSafeAreaView({
  children,
  backgroundColor,
}: {
  children: ReactElement;
  backgroundColor?: string;
}) {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.container, backgroundColor && { backgroundColor }]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: defaultColor.white,
  },
});
