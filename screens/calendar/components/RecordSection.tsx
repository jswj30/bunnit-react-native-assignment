import { memo, useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RecordHeadListType } from "../../../types/typeList";
import { defaultColor } from "../../../modules/defaultColor";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const PADDING = 30;
const BORDER_WIDTH = 3;
const CALENDAR_MARGIN = 168;

export default memo(function RecordSection({
  calendarHeight,
  RecordHeight,
  startHeight,
  defaultValue,
  width,
}: {
  calendarHeight: number;
  RecordHeight: Animated.SharedValue<number>;
  startHeight: Animated.SharedValue<number>;
  defaultValue: number;
  width: number;
}) {
  const [headList, setHeadList] = useState<RecordHeadListType[]>([
    {
      title: "식단",
      count: 0,
      isSelected: true,
    },
    {
      title: "운동",
      count: 0,
      isSelected: false,
    },
    {
      title: "신체",
      count: 0,
      isSelected: false,
    },
  ]);

  const BUTTON_WIDTH = (width - PADDING * 2 - BORDER_WIDTH * 4) / 3;

  const animatedStyles = useAnimatedStyle(() => ({
    height: RecordHeight.value - calendarHeight,
  }));

  const onPressHeadButton = useCallback((index: number) => {
    setHeadList((prev) => {
      const _headList = [...prev].map((list) => ({
        ...list,
        isSelected: false,
      }));
      _headList[index] = { ..._headList[index], isSelected: true };

      return _headList;
    });
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      startHeight.value = RecordHeight.value;
    })
    .onUpdate((e) => {
      const value = startHeight.value - e.translationY * 1.3;
      // 기본 크기 이상일 때
      if (defaultValue <= value) RecordHeight.value = value;
      // 기본 크기 이하일 때
      if (defaultValue > value) RecordHeight.value = defaultValue;
      // 최대 높이까지 올라갔을 때
      if (defaultValue - CALENDAR_MARGIN + calendarHeight < value)
        RecordHeight.value = defaultValue - CALENDAR_MARGIN + calendarHeight;
    })
    .onEnd(() => {
      startHeight.value = RecordHeight.value;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <View style={styles.headSection}>
          {headList.map((list, index) => (
            <Pressable
              key={list.title}
              style={[
                styles.headButton,
                { width: BUTTON_WIDTH },
                list.isSelected && {
                  backgroundColor: defaultColor.white,
                },
              ]}
              onPress={() => onPressHeadButton(index)}
            >
              <Text
                style={[
                  styles.headButtonText,
                  list.isSelected && {
                    color: defaultColor.black,
                    fontWeight: 500,
                  },
                ]}
              >
                {list.title} {list.count}
              </Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: defaultColor.lavender,
    paddingVertical: 20,
    paddingHorizontal: PADDING,
    backgroundColor: defaultColor.white,
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  headSection: {
    backgroundColor: defaultColor.lightPurple,
    borderWidth: BORDER_WIDTH,
    borderColor: defaultColor.lightPurple,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: BORDER_WIDTH,
  },
  headButton: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: defaultColor.lightPurple,
  },
  headButtonText: {
    color: defaultColor.gray1,
  },
});
