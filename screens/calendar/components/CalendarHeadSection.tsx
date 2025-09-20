import { Dispatch, SetStateAction, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const MONTH_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarHeadSection({
  PADDING,
  HEIGHT,
  selectedMonth,
  setSelectedMonth,
}: {
  PADDING: number;
  HEIGHT: number;
  selectedMonth: Date;
  setSelectedMonth: Dispatch<SetStateAction<Date>>;
}) {
  const { width } = useWindowDimensions();

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
      <Pressable
        style={[
          styles.arrowIcon,
          { width: (width - PADDING) / 7, height: HEIGHT },
        ]}
        onPress={() => onPressArrowIcon("prev")}
      >
        <Entypo name="chevron-small-left" size={30} color="#29B5BF" />
      </Pressable>

      <Text style={styles.yearAndMonth}>
        {`${
          MONTH_LIST[selectedMonth.getMonth()]
        } ${selectedMonth.getFullYear()}`}
      </Text>

      <Pressable
        style={[
          styles.arrowIcon,
          { width: (width - PADDING) / 7, height: HEIGHT },
        ]}
        onPress={() => onPressArrowIcon("next")}
      >
        <Entypo name="chevron-small-right" size={30} color="#29B5BF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  yearAndMonth: {
    flex: 1,
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: 500,
  },
  arrowIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
