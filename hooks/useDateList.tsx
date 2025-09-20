import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const useDateList = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [dateList, setDateList] = useState<Date[][]>([]);

  // 선택한 월(selectedMonth)의 전체 일 가져오기
  useFocusEffect(
    useCallback(() => {
      // 달력 일 전체 모음 배열
      const _dateList = [];

      // 월 첫날
      const firstDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        1
      );

      // 월 마지막 날
      const lastDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        0
      );

      // 달력에 출력되는 첫번째 날
      if (firstDate.getDay() !== 0) {
        firstDate.setDate(1 - firstDate.getDay());
      }

      // 한 주(7일) 모음 배열
      let oneWeek = [];

      // _dateList에 2차배열로 일 전체 모으기
      while (
        `${firstDate.getMonth() + 1}-${firstDate.getDate()}` !==
        `${lastDate.getMonth() + 1}-${lastDate.getDate()}`
      ) {
        oneWeek.push(new Date(firstDate));

        firstDate.setDate(firstDate.getDate() + 1);

        if (oneWeek.length === 7) {
          _dateList.push(oneWeek);
          oneWeek = [];
        }
      }

      oneWeek.push(new Date(firstDate));

      if (oneWeek.length > 0) {
        while (oneWeek.length < 7) {
          firstDate.setDate(firstDate.getDate() + 1);
          oneWeek.push(new Date(firstDate));
        }
        _dateList.push(oneWeek);
      }

      setDateList(_dateList);
    }, [selectedMonth])
  );

  return {
    selectedMonth,
    setSelectedMonth,
    dateList,
  };
};
