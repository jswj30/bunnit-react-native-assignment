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
  onPressArrowIcon,
}: {
  PADDING: number;
  HEIGHT: number;
  selectedMonth: Date;
  onPressArrowIcon: (type: "prev" | "next") => void;
}) {
  const { width } = useWindowDimensions();

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
