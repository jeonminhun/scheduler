// Event 타입 전역 사용을 위한 선언
export type Event = {
  id: string;
  title: string;
  date: string;
};

export type NewEvent = Omit<Event, "id">;