import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { defaultColor } from "../../../modules/defaultColor";

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
  HEIGHT,
  currentMonth,
  onPressArrowIcon,
}: {
  HEIGHT: number;
  currentMonth: Date;
  onPressArrowIcon: (type: "prev" | "next") => void;
}) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.arrowIcon, { width: width / 7, height: HEIGHT }]}
        onPress={() => onPressArrowIcon("prev")}
      >
        <Entypo name="chevron-small-left" size={30} color={defaultColor.teal} />
      </Pressable>

      <Text style={styles.yearAndMonth}>
        {`${MONTH_LIST[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
      </Text>

      <Pressable
        style={[styles.arrowIcon, { width: width / 7, height: HEIGHT }]}
        onPress={() => onPressArrowIcon("next")}
      >
        <Entypo
          name="chevron-small-right"
          size={30}
          color={defaultColor.teal}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultColor.white,
    paddingTop: 30,
    zIndex: 1,
  },
  yearAndMonth: {
    flex: 1,
    textAlign: "center",
    color: defaultColor.black,
    fontSize: 20,
    fontWeight: 500,
  },
  arrowIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
