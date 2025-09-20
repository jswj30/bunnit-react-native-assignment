import { StyleSheet, View } from "react-native";
import CalendarHeadSection from "./CalendarHeadSection";
import CalendarWeekSection from "./CalendarWeekSection";
import CalendarDateSection from "./CalendarDateSection";

const HEIGHT = 46;
const PADDING = 20;

export default function CalendarSection() {
  return (
    <View style={styles.container}>
      {/* Year, Month, Icon */}
      <CalendarHeadSection PADDING={PADDING} HEIGHT={HEIGHT} />
      {/* Week text */}
      <CalendarWeekSection PADDING={PADDING} HEIGHT={HEIGHT} />
      {/* Dates */}
      <CalendarDateSection PADDING={PADDING} HEIGHT={HEIGHT} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 30,
  },
});
