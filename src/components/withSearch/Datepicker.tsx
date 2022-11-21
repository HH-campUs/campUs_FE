import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { originDate } from "../../interfaces/inDate";
import ko from "date-fns/locale/ko";
import { getMonth, getDate, getDay } from "date-fns";
import { DateState } from "../../store/dateAtom";
import styled from "styled-components";

function Datepicker() {
  /* 처음에 new Date()로 datepicker에게 인지 */
  const [startDate, setStartDate] = useState(new Date());
  const [sendDate, setSendDate] = useRecoilState(DateState);

  /* weather 로 넘길 string으로 */
  const useYear = startDate.getFullYear().toString();
  const useMonth = ["0" + (startDate.getMonth() + 1)].toString().slice(-2);
  const useDate = ["0" + startDate.getDate()].toString().slice(-2);

  const useFullDate = useYear + useMonth + useDate;

  setSendDate(useFullDate);

  const [availableDays, setAvailableDays] = useState(false);

  return (
    <UseDatepicker
      selected={startDate}
      dateFormat="yyyy-MM-dd"
      onChange={(date: Date) => setStartDate(date)}
      /* inline : 바로 달력 나오게 */
      inline
    />
  );
}

export default Datepicker;

const UseDatepicker = styled(DatePicker)`
  width: 90%;
  height: 3rem;
  font-size: 1.6rem;
  font-weight: bold;
  background-color: transparent;
  color: white;
  border: 1px solid;
`;