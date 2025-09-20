import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function CalendarDateSection({
  PADDING,
  HEIGHT,
  selectedMonth,
  dateList,
}: {
  PADDING: number;
  HEIGHT: number;
  selectedMonth: Date;
  dateList: Date[][];
}) {
  const { width } = useWindowDimensions();

  return (
    <View>
      {dateList.map((list, index) => {
        return (
          <View key={`list-${index}`} style={styles.dateSection}>
            {list.map((date) => (
              <View
                key={`${date.getMonth() + 1}-${date.getDate()}`}
                style={[
                  styles.date,
                  {
                    width: (width - PADDING) / 7,
                    height: HEIGHT,
                  },
                ]}
              >
                {`${new Date().getMonth() + 1}-${new Date().getDate()}` ===
                `${date.getMonth() + 1}-${date.getDate()}` ? (
                  <View style={styles.today}>
                    <Text style={styles.todayText}>{date.getDate()}</Text>
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.dateText,
                      date.getMonth() !== selectedMonth.getMonth() && {
                        color: "#E7E7E7",
                      },
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                )}
              </View>
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
    color: "#5D5D5D",
    fontSize: 16,
  },
  today: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#4A739A",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    color: "#374245",
    fontSize: 16,
    fontWeight: 700,
  },
});
