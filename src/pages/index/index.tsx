import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction"; 
import { type EventClickArg } from "@fullcalendar/core"; 
import styles from "./styles/index.module.scss";
import { useCalendar } from "../../context/useCalendar";
import { useState } from "react";
import EventModal from "../../components/modal/EventModal";
import EventAdd from "../../components/modal/EventAdd";

function Index() {
  const { events, editEvent, addEvent } = useCalendar();

  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    title: string;
    date: string;
  } | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setIsAddOpen(true);
  };

  const handleEventClick = (arg: EventClickArg) => {
    setSelectedEvent({
      id: arg.event.id,
      title: arg.event.title,
      date: arg.event.startStr,
    });
    setIsModalOpen(true);
  };

  const handleSave = (data: { id: string; title: string; date: string }) => {
    editEvent(data);
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className={styles.calendarWrapper}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          events={events}
          selectable={false}
          select={undefined}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventMouseEnter={(info) => {
            info.el.style.backgroundColor = "red";
          }}
          eventMouseLeave={(info) => {
            info.el.style.backgroundColor = "";
          }}
          dayCellDidMount={(info) => {
            info.el.addEventListener("mouseenter", () => {
              info.el.style.backgroundColor = "lightyellow";
            });
            info.el.addEventListener("mouseleave", () => {
              info.el.style.backgroundColor = "";
            });
          }}
        />
      </div>

      {/* 수정 모달 */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventData={selectedEvent}
        onSave={handleSave}
      />

      {/* 추가 모달 */}
      <EventAdd
        isOpen={isAddOpen}
        evdate= {selectedDate}
        onClose={() => setIsAddOpen(false)}
        onSave={(data) => {
          addEvent({ ...data, date: selectedDate });
          setIsAddOpen(false);
        }}
      />
    </section>
  );
}

export default Index;