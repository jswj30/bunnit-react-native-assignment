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

const PADDING = 30;
const BORDER_WIDTH = 3;

export default memo(function RecordSection() {
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

  const { width } = useWindowDimensions();
  const BUTTON_WIDTH = (width - PADDING * 2 - BORDER_WIDTH * 4) / 3;

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

  return (
    <View style={styles.container}>
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
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: defaultColor.lavender,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: PADDING,
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
