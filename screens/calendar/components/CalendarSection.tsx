import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useDateList } from "../../../hooks/useDateList";
import CalendarHeadSection from "./CalendarHeadSection";
import CalendarWeekSection from "./CalendarWeekSection";
import CalendarDateSection from "./CalendarDateSection";

const HEIGHT = 46;

export default memo(function CalendarSection({
  setCalendarHeight,
}: {
  setCalendarHeight: Dispatch<SetStateAction<number>>;
}) {
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

  const handleLayout = useCallback((e) => {
    const { height } = e.nativeEvent.layout;
    setCalendarHeight(height);
  }, []);

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {/* Year, Month, Icon */}
      <CalendarHeadSection
        HEIGHT={HEIGHT}
        selectedMonth={selectedMonth}
        onPressArrowIcon={onPressArrowIcon}
      />
      {/* Week text */}
      <CalendarWeekSection HEIGHT={HEIGHT} />
      {/* Dates */}
      <CalendarDateSection
        HEIGHT={HEIGHT}
        selectedMonth={selectedMonth}
        dateList={dateList}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 30,
  },
});
