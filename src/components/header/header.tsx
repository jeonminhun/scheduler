import { useState } from "react";
import styles from "./header.module.scss";
import { useCalendar } from "../../context/useCalendar";
import EventSearch from "../../components/modal/EventSearch";
import { type Event } from "../../context/types";

function Header() {
  const [query, setQuery] = useState("");
  const { events } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event[]>([]);



  const handleEventClick = (arg: Event[]) => {
      setSelectedEvent(arg);
      setIsModalOpen(true);
    };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 새로고침 방지
    console.log("검색어:", query);
    const result = (events.filter((event) => event.title.toLowerCase().includes(query.toLowerCase()))
  );
  handleEventClick(result);
  
  console.log("검색어:", result);
    // 여기에 검색 로직 추가 (API 호출 등)
  };

  
    return (
      <div className={styles.header}>
        <img src="src\assets\logo.png" alt="로고입니다." />
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="search"
            placeholder="검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
          />

          <button type="submit" className={styles.searchBtn}>
            🔍
          </button>
        </form>
        {/* 로그인/아웃 버튼 생성 */}

        <EventSearch
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          eventData={selectedEvent}
        />
      </div>
    );
}

export default Header;
