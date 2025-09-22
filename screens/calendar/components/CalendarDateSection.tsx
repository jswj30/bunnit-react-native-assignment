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
  currentDateList,
  prevDateList,
  nextDateList,
  selectedDate,
  setSelectedDate,
  RecordHeight,
  defaultValue,
  onPressArrowIcon,
}: {
  HEIGHT: number;
  currentMonth: Date;
  prevMonth: Date;
  nextMonth: Date;
  currentDateList: Date[][];
  prevDateList: Date[][];
  nextDateList: Date[][];
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  RecordHeight: Animated.SharedValue<number>;
  defaultValue: number;
  onPressArrowIcon: (type: "prev" | "next") => void;
}) {
  const { width } = useWindowDimensions();

  const snap = useSharedValue<number>(0);

  const findDateIndex = useCallback(() => {
    const today = new Date();
    const findDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const dateList = currentDateList.map((list) => {
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
  }, [currentDateList]);

  useFocusEffect(
    useCallback(() => {
      findDateIndex();
    }, [selectedDate])
  );

  const weekIndex = findDateIndex();

  // 월이 변경되면 snap 값을 리셋
  useFocusEffect(
    useCallback(() => {
      snap.value = 0;
    }, [currentMonth])
  );

  // 날짜 선택 함수
  const onPressDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // 월 달력 상/하 애니메이션
  const calendarAnimatedStyle = useAnimatedStyle(() => {
    const changedValue = defaultValue - RecordHeight.value;
    const dateHeight = HEIGHT * (currentDateList.length - 1) + 30;

    return {
      transform: [
        {
          translateY:
            changedValue / ((currentDateList.length - 0.35) / weekIndex),
        },
      ],
      opacity: (changedValue + dateHeight) / dateHeight,
    };
  });

  // 주 달력 상/하 애니메이션
  const weekAnimatedStyle = useAnimatedStyle(() => {
    const changedValue = defaultValue - RecordHeight.value;
    const dateHeight = HEIGHT * (currentDateList.length - 1) + 30;

    return {
      transform: [
        {
          translateY:
            changedValue / ((currentDateList.length - 0.35) / weekIndex),
        },
      ],
      opacity: 1 - (changedValue + dateHeight) / dateHeight,
    };
  });

  // 달력 스냅 애니메이션
  const snapStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: snap.value,
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
  const WeekComponent = () => {
    return (
      <Animated.View
        style={[
          {
            backgroundColor: defaultColor.white,
            flexDirection: "row",
            position: "absolute",
            top: HEIGHT * weekIndex,
            left: 0,
            zIndex: 1,
            width,
          },
          weekAnimatedStyle,
        ]}
      >
        {currentDateList[weekIndex]?.map((date, j) => (
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

  // 달력 스냅 제스쳐
  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      snap.value = e.translationX;
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
          snap.value = withSpring(width, {}, () => {
            runOnJS(onPressArrowIcon)("prev");
          });
        }

        if (translationX <= 0) {
          snap.value = withSpring(-width, {}, () => {
            runOnJS(onPressArrowIcon)("next");
          });
        }
      } else {
        snap.value = withSpring(0);
      }
    });

  return (
    <View style={styles.container}>
      <WeekComponent />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, snapStyle]}>
          <CalendarComponent dateList={prevDateList} month={prevMonth} isPrev />
          <CalendarComponent dateList={currentDateList} month={currentMonth} />
          <CalendarComponent dateList={nextDateList} month={nextMonth} isNext />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
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
