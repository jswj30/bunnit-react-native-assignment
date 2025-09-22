import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useDateList } from "../../../hooks/useDateList";
import Animated from "react-native-reanimated";
import CalendarHeadSection from "./CalendarHeadSection";
import CalendarWeekSection from "./CalendarWeekSection";
import CalendarDateSection from "./CalendarDateSection";

const HEIGHT = 46;

export default memo(function CalendarSection({
  setCalendarHeight,
  RecordHeight,
  defaultValue,
}: {
  setCalendarHeight: Dispatch<SetStateAction<number>>;
  RecordHeight: Animated.SharedValue<number>;
  defaultValue: number;
}) {
  const {
    currentMonth,
    prevMonth,
    nextMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    currentDateList,
    prevDateList,
    nextDateList,
  } = useDateList();

  const onPressArrowIcon = useCallback((type: "prev" | "next") => {
    setCurrentMonth((prev) => {
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
        currentMonth={currentMonth}
        onPressArrowIcon={onPressArrowIcon}
      />
      {/* Week text */}
      <CalendarWeekSection HEIGHT={HEIGHT} />
      {/* Dates */}
      <CalendarDateSection
        HEIGHT={HEIGHT}
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        currentDateList={currentDateList}
        prevDateList={prevDateList}
        nextDateList={nextDateList}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        RecordHeight={RecordHeight}
        defaultValue={defaultValue}
        onPressArrowIcon={onPressArrowIcon}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 30,
  },
});
