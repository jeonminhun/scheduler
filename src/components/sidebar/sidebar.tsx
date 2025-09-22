import { useState } from 'react';
import styles from './sidebar.module.scss'
import EventAdd from "../../components/modal/EventAdd";
import { useCalendar } from "../../context/useCalendar";

function Sidebar() {
  const { addEvent } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const savehandler = (data:{title:string; date:string})=>{
   addEvent(data);
   setIsModalOpen(false);
  }

  return (
    <div className={styles.sidebar}>
      <nav className={styles.menu}>
        <ul>
          <li>
            <a onClick={()=>setIsModalOpen(true)} /*href="/add"*/>일정 추가</a>
          </li>
          <li>
            <a href="/">일정</a>
          </li>
          <li>
            <a href="/today">오늘 할일</a>
          </li>
        </ul>
      </nav>
      <EventAdd
        isOpen={isModalOpen}
        evdate=''
        onClose={() => setIsModalOpen(false)}
        onSave={savehandler}
      />
    </div>
  );
}
export default Sidebar;