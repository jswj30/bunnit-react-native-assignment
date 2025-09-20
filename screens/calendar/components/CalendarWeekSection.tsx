import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

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
              week === "Sun" && { color: "#B8696B" },
              week === "Sat" && { color: "#7FA9D0" },
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
    color: "#C6C8CB",
    fontSize: 12,
  },
});
