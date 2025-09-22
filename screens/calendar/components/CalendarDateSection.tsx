import { Dispatch, SetStateAction, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { returnIsToday } from "../../../modules/commonModules";
import { defaultColor } from "../../../modules/defaultColor";

const MIN_SNAP = 80;
const MIN_VELOCITY = 500;

export default function CalendarDateSection({
  HEIGHT,
  currentMonth,
  prevMonth,
  nextMonth,
  currentMonthDateList,
  prevMonthDateList,
  nextMonthDateList,
  selectedDate,
  setSelectedDate,
  RecordHeight,
  defaultValue,
  onPressArrowIcon,
  currentWeekDateList,
  prevWeekDateList,
  nextWeekDateList,
  currentDate,
  setWeekDateList,
}: {
  HEIGHT: number;
  currentMonth: Date;
  prevMonth: Date;
  nextMonth: Date;
  currentMonthDateList: Date[][];
  prevMonthDateList: Date[][];
  nextMonthDateList: Date[][];
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  RecordHeight: Animated.SharedValue<number>;
  defaultValue: number;
  onPressArrowIcon: (type: "prev" | "next") => void;
  currentWeekDateList: Date[];
  prevWeekDateList: Date[];
  nextWeekDateList: Date[];
  currentDate: Date;
  setWeekDateList: (type: "prev" | "next") => void;
}) {
  const { width } = useWindowDimensions();

  const monthSnap = useSharedValue<number>(0);
  const weekSnap = useSharedValue<number>(0);

  const findDateIndex = useCallback(() => {
    // const today = new Date();
    const findDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const dateList = currentMonthDateList.map((list) => {
      return list.map(
        (date) =>
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );
    });

    let index = 0;

    dateList.forEach((list, i) => {
      if (list.includes(findDate)) {
        index = i;
      }
    });

    return index;
  }, [currentDate, currentMonthDateList]);

  const weekIndex = findDateIndex();

  // 월이 변경되면 monthSnap 값을 리셋
  useFocusEffect(
    useCallback(() => {
      monthSnap.value = 0;
    }, [currentMonth])
  );

  // 주가 변경되면 weekSnap 값을 리셋
  useFocusEffect(
    useCallback(() => {
      weekSnap.value = 0;
    }, [currentDate])
  );

  // 날짜 선택 함수
  const onPressDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // 월 달력 상/하 애니메이션
  const calendarAnimatedStyle = useAnimatedStyle(() => {
    const changedValue = defaultValue - RecordHeight.value;
    const dateHeight = HEIGHT * (currentMonthDateList.length - 1) + 30;

    return {
      transform: [
        {
          translateY:
            changedValue / ((currentMonthDateList.length - 0.35) / weekIndex),
        },
      ],
      opacity: (changedValue + dateHeight) / dateHeight,
    };
  });

  // 주 달력 상/하 애니메이션
  const weekAnimatedStyle = useAnimatedStyle(() => {
    const changedValue = defaultValue - RecordHeight.value;
    const dateHeight = HEIGHT * (currentMonthDateList.length - 1) + 30;

    return {
      transform: [
        {
          translateY:
            changedValue / ((currentMonthDateList.length - 0.35) / weekIndex),
        },
      ],
      opacity: 1 - (changedValue + dateHeight) / dateHeight,
    };
  });

  // 월 달력 스냅 애니메이션
  const monthSnapStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: monthSnap.value,
        },
      ],
    };
  });

  // 주 달력 스냅 애니메이션
  const weekSnapStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: weekSnap.value,
        },
      ],
    };
  });

  // 달력 날짜 컴포넌트
  const DateComponent = ({ date, month }: { date: Date; month: Date }) => (
    <Pressable
      key={`${date.getMonth() + 1}-${date.getDate()}`}
      style={[
        styles.date,
        {
          width: width / 7,
          height: HEIGHT,
        },
      ]}
      onPress={() => onPressDate(date)}
    >
      <View
        style={
          selectedDate && returnIsToday(selectedDate, date) && styles.selected
        }
      >
        <Text
          style={[
            styles.dateText,
            date.getMonth() !== month.getMonth() && {
              color: defaultColor.lightGray,
            },
            returnIsToday(new Date(), date) && styles.todayText,
          ]}
        >
          {date.getDate()}
        </Text>
      </View>
    </Pressable>
  );

  // 주 달력 컴포넌트
  const WeekComponent = ({
    dateList,
    isPrev,
    isNext,
  }: {
    dateList: Date[];
    isPrev?: boolean;
    isNext?: boolean;
  }) => {
    return (
      <Animated.View
        style={[
          {
            backgroundColor: defaultColor.white,
            flexDirection: "row",
            position: "absolute",
            top: HEIGHT * weekIndex,
            left: 0,
            zIndex: 10,
            width: width,
          },
          isPrev && {
            left: -width,
          },
          isNext && {
            left: width,
          },
          weekAnimatedStyle,
        ]}
      >
        {dateList.map((date, j) => (
          <DateComponent date={date} month={currentMonth} key={`date-${j}`} />
        ))}
      </Animated.View>
    );
  };

  // 월 달력 컴포넌트
  const CalendarComponent = ({
    dateList,
    month,
    isPrev,
    isNext,
  }: {
    dateList: Date[][];
    month: Date;
    isPrev?: boolean;
    isNext?: boolean;
  }) => (
    <>
      <Animated.View
        style={[
          {
            backgroundColor: defaultColor.white,
            width,
          },
          isPrev && {
            position: "absolute",
            top: 0,
            left: -width,
          },
          isNext && {
            position: "absolute",
            top: 0,
            right: -width,
          },
          calendarAnimatedStyle,
        ]}
      >
        {dateList.map((list, index) => {
          return (
            <View key={`list-${index}`} style={styles.dateSection}>
              {list.map((date, j) => (
                <DateComponent date={date} month={month} key={`date-${j}`} />
              ))}
            </View>
          );
        })}
      </Animated.View>
    </>
  );

  // 월 달력 스냅 제스쳐
  const monthGesture = Gesture.Pan()
    .onUpdate((e) => {
      monthSnap.value = e.translationX;
    })
    .onEnd((e) => {
      const { translationX, velocityX } = e;

      // snap 기준
      if (
        Math.abs(translationX) > MIN_SNAP ||
        Math.abs(velocityX) > MIN_VELOCITY
      ) {
        // +: prev, -: next
        if (translationX > 0) {
          monthSnap.value = withSpring(width, {}, () => {
            runOnJS(onPressArrowIcon)("prev");
          });
        }

        if (translationX <= 0) {
          monthSnap.value = withSpring(-width, {}, () => {
            runOnJS(onPressArrowIcon)("next");
          });
        }
      } else {
        monthSnap.value = withSpring(0);
      }
    });

  // 주 달력 스냅 제스쳐
  const weekGesture = Gesture.Pan()
    .onUpdate((e) => {
      weekSnap.value = e.translationX;
    })
    .onEnd((e) => {
      const { translationX, velocityX } = e;

      // snap 기준
      if (
        Math.abs(translationX) > MIN_SNAP ||
        Math.abs(velocityX) > MIN_VELOCITY
      ) {
        // +: prev, -: next
        if (translationX > 0) {
          weekSnap.value = withSpring(width, {}, () => {
            runOnJS(setWeekDateList)("prev");
          });
        }

        if (translationX <= 0) {
          weekSnap.value = withSpring(-width, {}, () => {
            runOnJS(setWeekDateList)("next");
          });
        }
      } else {
        weekSnap.value = withSpring(0);
      }
    });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={weekGesture}>
        <Animated.View style={[styles.weekContainer, weekSnapStyle]}>
          <WeekComponent dateList={prevWeekDateList} isPrev />
          <WeekComponent dateList={currentWeekDateList} />
          <WeekComponent dateList={nextWeekDateList} isNext />
        </Animated.View>
      </GestureDetector>

      <GestureDetector gesture={monthGesture}>
        <Animated.View style={[styles.container, monthSnapStyle]}>
          <CalendarComponent
            dateList={prevMonthDateList}
            month={prevMonth}
            isPrev
          />
          <CalendarComponent
            dateList={currentMonthDateList}
            month={currentMonth}
          />
          <CalendarComponent
            dateList={nextMonthDateList}
            month={nextMonth}
            isNext
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  weekContainer: {
    position: "relative",
    backgroundColor: defaultColor.white,
    zIndex: 1,
  },
  container: {
    position: "relative",
    backgroundColor: defaultColor.white,
  },
  dateSection: {
    flexDirection: "row",
    position: "relative",
  },
  date: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    color: defaultColor.darkGray,
    fontSize: 16,
  },
  selected: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: defaultColor.navy,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    color: defaultColor.charcoal,
    fontWeight: 700,
  },
});
