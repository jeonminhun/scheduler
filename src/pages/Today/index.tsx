import { useState } from "react";
import { useCalendar } from "../../context/useCalendar";
import {format} from 'date-fns';
import EventModal from "../../components/modal/EventModal";
import { type Event } from "../../context/types";

export default function TodayPage() {
  const { events, deleteEvent, editEvent } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date();
  const nowdate = format(today,"yyyy-MM-dd");
  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    title: string;
    date: string;
  } | null>(null);

  const handleSave = (data: { id: string; title: string; date: string }) => {
    editEvent(data);
    setIsModalOpen(false);
  };

  const handleEventClick = (arg: Event) => {
    setSelectedEvent({
      id: arg.id,
      title: arg.title,
      date: arg.date,
    });
    setIsModalOpen(true);
  };


  return (
    // 내일 일정 일정 있으니까 고민 해봐야함 오늘 일정에 추가로 밑에 다음 일정 추가 생각해보기 날자랑 머 그런거
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="w-full max-w-[1250px] bg-gray-300 rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">오늘의 할 일</h1>

        {/* Accordion */}
        <div>
          {/* <h3
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex justify-between items-center font-semibold text-lg mb-2"
          >
            기한이 지난
            <span>{isOpen ? "▲" : "▼"}</span>
          </h3> {isOpen && (
              <span>asdf</span>
            )  a && b 문법 전자가 참일경우 후자 반영*/}
          <ul className="space-y-2">
            {events
              .filter((event) => event.date === nowdate)
              .map((task) => (
                <li className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                  <span>{task.date}</span>
                  <span>{task.title}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEventClick(task)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => deleteEvent(task.id)}
                      className="text-red-500 hover:text-red-700">
                      삭제
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* 아무 것도 없을 때 */}
        {events.length === 0 && (
          <p className="text-gray-400 text-center mt-4">할 일이 없습니다.</p>
        )}
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventData={selectedEvent}
        onSave={handleSave}
      />
    </div>
  );
}
