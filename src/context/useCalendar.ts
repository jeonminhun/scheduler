import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar는 CalendarProvider 안에서 사용해야 합니다.");
  }
  return context;
};
