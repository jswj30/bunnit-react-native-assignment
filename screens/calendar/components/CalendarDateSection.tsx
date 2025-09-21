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
  selectedMonth,
  dateList,
  selectedDate,
  setSelectedDate,
}: {
  HEIGHT: number;
  selectedMonth: Date;
  dateList: Date[][];
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}) {
  const { width } = useWindowDimensions();

  const onPressDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  return (
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
                      date.getMonth() !== selectedMonth.getMonth() && {
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
}

const styles = StyleSheet.create({
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
