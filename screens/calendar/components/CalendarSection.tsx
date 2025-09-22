import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useDateList } from "../../../hooks/useDateList";
import { useFocusEffect } from "@react-navigation/native";
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
    currentMonthDateList,
    prevMonthDateList,
    nextMonthDateList,
    currentWeekDateList,
    prevWeekDateList,
    nextWeekDateList,
    currentDate,
    setCurrentDate,
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

  // 주 달력과 월 달력의 월이 불일치 시 적용
  useFocusEffect(
    useCallback(() => {
      if (currentMonth.getMonth() !== currentDate.getMonth()) {
        const newDate = new Date(currentMonth);
        setCurrentDate(newDate);
      }
    }, [currentMonth])
  );

  // 주 달력 날짜 출력
  const setWeekDateList = useCallback((type: "prev" | "next") => {
    setCurrentDate((prev) => {
      const prevWeek = new Date(prev);
      const newWeek = new Date(prev);

      const prevSunday = new Date(prevWeek);

      if (prevSunday.getDay() !== 0) {
        prevSunday.setDate(prevSunday.getDate() - prevSunday.getDay());
      }

      if (type === "prev") {
        newWeek.setDate(newWeek.getDate() - 7);

        const newSunday = new Date(newWeek);

        if (newSunday.getDay() !== 0) {
          newSunday.setDate(newSunday.getDate() - newSunday.getDay());
        }

        if (prevSunday.getMonth() !== newSunday.getMonth()) {
          onPressArrowIcon("prev");
        }
      }

      if (type === "next") {
        newWeek.setDate(newWeek.getDate() + 7);

        const newSunday = new Date(newWeek);

        if (newSunday.getDay() !== 0) {
          newSunday.setDate(newSunday.getDate() - newSunday.getDay());
        }

        if (prevSunday.getMonth() !== newSunday.getMonth()) {
          onPressArrowIcon("next");
        }
      }

      return newWeek;
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
        currentMonthDateList={currentMonthDateList}
        prevMonthDateList={prevMonthDateList}
        nextMonthDateList={nextMonthDateList}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        RecordHeight={RecordHeight}
        defaultValue={defaultValue}
        onPressArrowIcon={onPressArrowIcon}
        currentWeekDateList={currentWeekDateList}
        prevWeekDateList={prevWeekDateList}
        nextWeekDateList={nextWeekDateList}
        currentDate={currentDate}
        setWeekDateList={setWeekDateList}
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
