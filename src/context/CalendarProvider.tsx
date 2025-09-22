import { useEffect, useState, type ReactNode } from "react";
import { CalendarContext, type CalendarContextType } from "./CalendarContext";
import type { Event, NewEvent } from "./types";
import { v4 as uuid } from 'uuid';

// calender context 컴포넌트에 적용하기 및 컴포넌트 날자 저장 매커니즘 확인해서 적용하기
// datejs 깐거 지우기


export const CalendarProvider = ({ children }: { children: ReactNode }) => {

  // 전역 변수 호출시 로컬 스토리지 데이터 가져오기 
  const [events, setEvents] = useState(() => {
    const localData = localStorage.getItem("event");
    const parsed: Event[] = localData ? JSON.parse(localData) : [];
    return parsed.filter((e) => e.title && e.date && e.id); // 빈값을 필터링 해서 재 업데이트 
  });

  // 전역 변수에 데이터 입력
 const addEvent = (event: NewEvent) => {
   if (!event.title.trim() || !event.date.trim()) return; // 이벤트가 들어올때마다 유즈 이펙트로 인해 빈값이 업데이트 돼는현상 해결을 위해 빈값 검증하는 기능 추가
   setEvents((prev: Event[]) => {
     const newEvent: Event = { ...event, id: uuid() };
     return [...prev, newEvent];
   });
 };
 const deleteEvent = (id:string)=>{
  setEvents((prev: Event[]) => prev.filter((event) => event.id !== id));
 }

 const editEvent = (event: Event) => {
  if (!event.title.trim() || !event.date.trim()) return; // 이벤트가 들어올때마다 유즈 이펙트로 인해 빈값이 업데이트 돼는현상 해결을 위해 빈값 검증하는 기능 추가 
  setEvents((prev: Event[]) => prev.filter((data) => data.id !== event.id));
   setEvents((prev: Event[]) => [...prev, event]);
 };

 //데이터 로컬 스토리지 저장 
 useEffect(() => {
   localStorage.setItem("event", JSON.stringify(events));
 }, [events]);

// 안정성 컴파일 타임에 오류를 잡기위함
const value: CalendarContextType = { events, addEvent, deleteEvent, editEvent };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
