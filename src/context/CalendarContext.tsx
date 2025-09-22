import { createContext } from "react";
import type { Event, NewEvent } from "./types";
// context 분리 
export type CalendarContextType = {
  events: Event[];
  addEvent: (event: NewEvent) => void;
  deleteEvent: (id: string) => void;
  editEvent:(event: Event) => void;
};

export const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);
