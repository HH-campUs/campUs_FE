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
import { isDateProps } from "../../interfaces/Modal";
import styled, { keyframes } from "styled-components";

function Datepicker({ openDate }: isDateProps) {
  /* 처음에 new Date()로 datepicker에게 인지 */
  const [startDate, setStartDate] = useRecoilState(StartDate);
  const [sendYear, setSendYear] = useRecoilState(StrYear);
  const [sendMonth, setSendMonth] = useRecoilState(StrMonth);
  const [sendDay, setSendDay] = useRecoilState(StrDay);

  /* weather api 에 사용될 dt값 */
  const [sendDate, setSendDate] = useRecoilState(DateState);

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
    <CustomDatepicker openDate={openDate}>
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
      <ValiInfo>
        <b>·</b> <span>날씨정보 제공일</span>
        <b>·</b> <span>선택 날짜</span>
      </ValiInfo>
    </CustomDatepicker>
  );
}

export default Datepicker;

const fadeIn = keyframes`
  from {opacity: 0} 
    to {opacity: 1}

`;

const fadeOut = keyframes`
  from {opacity: 1} 
    to {opacity: 0}
`;

const CustomDatepicker = styled.div<{ openDate: boolean }>`
  animation-name: ${(props) => (props.openDate == false ? fadeOut : fadeIn)};
  animation-duration: 1.2s;
`;

const ValiInfo = styled.div`
  width: ${(props) => props.theme.pixelToRem(200)};
  height: ${(props) => props.theme.pixelToRem(16)};
  margin: 66px 24px 0 18px;
  ${(props) => props.theme.fontTheme.Caption4};
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colorTheme.text2} !important;
  position: absolute;
  b {
    margin-top: -31.5px;

    ${(props) => props.theme.fontTheme.Subtitle3};
    font-size: ${(props) => props.theme.pixelToRem(60)} !important;
    display: inline-block;
    position: absolute;

    &:nth-child(1) {
      margin-left: -15px;
      color: ${(props) => props.theme.colorTheme.primary3};
    }
    &:nth-child(3) {
      margin-left: -10px;
      color: ${(props) => props.theme.colorTheme.primary1};
    }
  }
  span {
    margin-right: 15px;
  }
`;
