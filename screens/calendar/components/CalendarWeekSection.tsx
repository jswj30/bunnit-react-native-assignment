import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { defaultColor } from "../../../modules/defaultColor";

const WEEK_LIST = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarWeekSection({
  PADDING,
  HEIGHT,
}: {
  PADDING: number;
  HEIGHT: number;
}) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {WEEK_LIST.map((week) => (
        <View
          key={week}
          style={[
            styles.week,
            { width: (width - PADDING) / 7, height: HEIGHT },
          ]}
        >
          <Text
            style={[
              styles.weekText,
              week === "Sun" && { color: defaultColor.red },
              week === "Sat" && { color: defaultColor.blue },
            ]}
          >
            {week}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  week: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  weekText: {
    color: defaultColor.gray,
    fontSize: 12,
  },
});
