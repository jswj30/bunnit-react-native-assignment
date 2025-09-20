// 두 날짜가 같은지 확인하는 함수
export const returnIsToday = (date1: Date, date2: Date) => {
  return (
    `${date1.getMonth() + 1}-${date1.getDate()}` ===
    `${date2.getMonth() + 1}-${date2.getDate()}`
  );
};
