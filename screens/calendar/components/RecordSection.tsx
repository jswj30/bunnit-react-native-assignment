import { memo, useCallback, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { RecordHeadListType } from "../../../types/typeList";
import { defaultColor } from "../../../modules/defaultColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const PADDING = 30;
const BORDER_WIDTH = 3;
const CALENDAR_MARGIN = 168;

export default memo(function RecordSection({
  calendarHeight,
}: {
  calendarHeight: number;
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

  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const BUTTON_WIDTH = (width - PADDING * 2 - BORDER_WIDTH * 4) / 3;

  const defaultHeight = height - top - tabBarHeight;
  const containerHeight = useSharedValue<number>(defaultHeight);
  const startHeight = useSharedValue<number>(0);

  const animatedStyles = useAnimatedStyle(() => ({
    height: containerHeight.value - calendarHeight,
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
      startHeight.value = containerHeight.value;
    })
    .onUpdate((e) => {
      const value = startHeight.value - e.translationY * 1.3;
      // 기본 크기 이상일 때
      if (defaultHeight <= value) containerHeight.value = value;
      // 기본 크기 이하일 때
      if (defaultHeight > value) containerHeight.value = defaultHeight;
      // 최대 높이까지 올라갔을 때
      if (defaultHeight - CALENDAR_MARGIN + calendarHeight < value)
        containerHeight.value =
          defaultHeight - CALENDAR_MARGIN + calendarHeight;
    })
    .onEnd(() => {
      startHeight.value = containerHeight.value;
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
