import React, { useState } from "react";
import { useRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import "../../style/customDatepicker.css";
import dayjs from "dayjs";
import { originDate } from "../../interfaces/inDate";
import { ko } from "date-fns/locale";
import { addDays } from "date-fns";
import {
  StartDate,
  DateState,
  StrYear,
  StrMonth,
  StrDay,
} from "../../store/dateAtom";
import styled from "styled-components";

function Datepicker() {
  /* 처음에 new Date()로 datepicker에게 인지 */
  const [startDate, setStartDate] = useRecoilState(StartDate);
  const [sendDate, setSendDate] = useRecoilState(DateState);
  const [sendYear, setSendYear] = useRecoilState(StrYear);
  const [sendMonth, setSendMonth] = useRecoilState(StrMonth);
  const [sendDay, setSendDay] = useRecoilState(StrDay);

  /* weather 로 넘길 string으로 */
  const useYear = startDate.getFullYear().toString();
  const useMonth = ["0" + (startDate.getMonth() + 1)].toString().slice(-2);
  const useDate = ["0" + startDate.getDate()].toString().slice(-2);

  const useFullDate = useYear + useMonth + useDate;

  setSendDate(useFullDate);
  setSendYear(useYear);
  setSendMonth(useMonth);
  setSendDay(useDate);

  return (
    <DatePicker
      selected={startDate}
      dateFormat="yyyy-MM-dd"
      onChange={(date: Date) => setStartDate(date)}
      /* 한글 */
      locale={ko}
      /* 날씨 정보를 제공을 해주는 날들 오늘 + 7일 */
      highlightDates={[
        addDays(new Date(), 0),
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4),
        addDays(new Date(), 5),
        addDays(new Date(), 6),
        addDays(new Date(), 7),
      ]}
      /* 선택 못하는 날들 (= 지난 날들) */
      minDate={new Date()}
      scrollableMonthYearDropdown={true}
      /* inline : 바로 달력 나오게 */
      inline
    />
  );
}

export default Datepicker;
