import { StyleSheet, View } from "react-native";
import { useDateList } from "../../../hooks/useDateList";
import CalendarHeadSection from "./CalendarHeadSection";
import CalendarWeekSection from "./CalendarWeekSection";
import CalendarDateSection from "./CalendarDateSection";

const HEIGHT = 46;
const PADDING = 20;

export default function CalendarSection() {
  const { selectedMonth, setSelectedMonth, dateList } = useDateList();

  return (
    <View style={styles.container}>
      {/* Year, Month, Icon */}
      <CalendarHeadSection
        PADDING={PADDING}
        HEIGHT={HEIGHT}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      {/* Week text */}
      <CalendarWeekSection PADDING={PADDING} HEIGHT={HEIGHT} />
      {/* Dates */}
      <CalendarDateSection
        PADDING={PADDING}
        HEIGHT={HEIGHT}
        selectedMonth={selectedMonth}
        dateList={dateList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 30,
  },
});
