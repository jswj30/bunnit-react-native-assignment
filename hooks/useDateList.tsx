import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const useDateList = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // 월 달력
  const [currentMonthDateList, setCurrentMonthDateList] = useState<Date[][]>(
    []
  );
  const [prevMonthDateList, setPrevMonthDateList] = useState<Date[][]>([]);
  const [nextMonthDateList, setNextMonthDateList] = useState<Date[][]>([]);
  // 주 달력
  const [currentWeekDateList, setCurrentWeekDateList] = useState<Date[]>([]);
  const [prevWeekDateList, setPrevWeekDateList] = useState<Date[]>([]);
  const [nextWeekDateList, setNextWeekDateList] = useState<Date[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const prevMonth = new Date(currentMonth);
  prevMonth.setMonth(prevMonth.getMonth() - 1);

  const nextMonth = new Date(currentMonth);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const prevDate = new Date(currentDate);
  prevDate.setDate(prevDate.getDate() - 7);

  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 7);

  const getMonthDateList = useCallback(
    (setState: Dispatch<SetStateAction<Date[][]>>, month: Date) => {
      // 달력 일 전체 모음 배열
      const _dateList = [];

      // 월 첫날
      const firstDate = new Date(month.getFullYear(), month.getMonth(), 1);

      // 월 마지막 날
      const lastDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

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

      setState(_dateList);
    },
    []
  );

  // 선택한 월(selectedMonth)의 전체 일 가져오기
  useFocusEffect(
    useCallback(() => {
      getMonthDateList(setCurrentMonthDateList, currentMonth);
      getMonthDateList(setPrevMonthDateList, prevMonth);
      getMonthDateList(setNextMonthDateList, nextMonth);
    }, [currentMonth])
  );

  const getWeekDateList = useCallback(
    (setState: Dispatch<SetStateAction<Date[]>>, date: Date) => {
      // 주 첫날
      const firstDate = new Date(date);
      const firstDateDay = firstDate.getDay();
      firstDate.setDate(date.getDate() - firstDateDay);

      // 주 마지막 날
      const lastDate = new Date(firstDate);
      lastDate.setDate(firstDate.getDate() + 6);

      // 한 주(7일) 모음 배열
      let oneWeek = [];

      // 일요일부터 토요일까지 7일 생성
      for (let i = 0; i < 7; i++) {
        const _currentDate = new Date(firstDate);
        _currentDate.setDate(firstDate.getDate() + i);
        oneWeek.push(_currentDate);
      }

      setState(oneWeek);
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      getWeekDateList(setCurrentWeekDateList, currentDate);
      getWeekDateList(setPrevWeekDateList, prevDate);
      getWeekDateList(setNextWeekDateList, nextDate);
    }, [currentDate])
  );

  return {
    currentMonth,
    prevMonth,
    nextMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    currentMonthDateList,
    prevMonthDateList,
    nextMonthDateList,
    currentWeekDateList,
    prevWeekDateList,
    nextWeekDateList,
    currentDate,
    setCurrentDate,
  };
};
