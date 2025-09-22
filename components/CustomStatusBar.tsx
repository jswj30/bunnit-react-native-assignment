import { View, StyleSheet } from "react-native";
import { defaultColor } from "../modules/defaultColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

export default function CustomStatusBar() {
  const { top } = useSafeAreaInsets();

  const isFocused = useIsFocused();

  return isFocused ? (
    <>
      <View style={{ height: top, backgroundColor: defaultColor.white }} />
      <StatusBar style="dark" backgroundColor={defaultColor.white} />
    </>
  ) : null;
}
