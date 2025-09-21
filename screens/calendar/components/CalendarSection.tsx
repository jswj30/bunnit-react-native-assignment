import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useDateList } from "../../../hooks/useDateList";
import CalendarHeadSection from "./CalendarHeadSection";
import CalendarWeekSection from "./CalendarWeekSection";
import CalendarDateSection from "./CalendarDateSection";

const HEIGHT = 46;
const PADDING = 20;

export default function CalendarSection() {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedDate,
    setSelectedDate,
    dateList,
  } = useDateList();

  const onPressArrowIcon = useCallback((type: "prev" | "next") => {
    setSelectedMonth((prev) => {
      const newMonth = new Date(prev);

      if (type === "prev") {
        newMonth.setMonth(newMonth.getMonth() - 1);
      }

      if (type === "next") {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }

      return newMonth;
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Year, Month, Icon */}
      <CalendarHeadSection
        PADDING={PADDING}
        HEIGHT={HEIGHT}
        selectedMonth={selectedMonth}
        onPressArrowIcon={onPressArrowIcon}
      />
      {/* Week text */}
      <CalendarWeekSection PADDING={PADDING} HEIGHT={HEIGHT} />
      {/* Dates */}
      <CalendarDateSection
        PADDING={PADDING}
        HEIGHT={HEIGHT}
        selectedMonth={selectedMonth}
        dateList={dateList}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
});
