import { Dispatch, SetStateAction, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { returnIsToday } from "../../../modules/commonModules";
import { defaultColor } from "../../../modules/defaultColor";

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
}) {
  const { width } = useWindowDimensions();

  const onPressDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const CalendarComponent = ({
    dateList,
    month,
  }: {
    dateList: Date[][];
    month: Date;
  }) => (
    <View>
      {dateList.map((list, index) => {
        return (
          <View key={`list-${index}`} style={styles.dateSection}>
            {list.map((date) => (
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
                    selectedDate &&
                    returnIsToday(selectedDate, date) &&
                    styles.selected
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
            ))}
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <CalendarComponent dateList={prevDateList} month={prevMonth} />
      <CalendarComponent dateList={currentDateList} month={currentMonth} />
      <CalendarComponent dateList={nextDateList} month={nextMonth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dateSection: {
    flexDirection: "row",
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
