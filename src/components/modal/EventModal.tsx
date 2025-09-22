import React, { useEffect, useRef, useState } from "react";
import { useCalendar } from "../../context/useCalendar";
import ReactDOM from "react-dom";

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventData: {
    id: string;
    title: string;
    date: string;
  } | null;
  onSave: (data: { id: string; title: string; date: string }) => void;
};

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  eventData,
  onSave,
}) => {
  const root = document.getElementById("root"); // 팝업창 순서 겹침 협상 해결을 위한 루트 설정
  const { deleteEvent } = useCalendar();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const escKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escKeyDown);
    return () => document.removeEventListener("keydown", escKeyDown);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onSave({ id, title, date });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [title, date]);

  const outsideclick = (e: MouseEvent) => {
    const modal = document.getElementById("modal-container");
    if (modal && !modal.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", outsideclick);
    return () => document.removeEventListener("mousedown", outsideclick);
  }, []);

  useEffect(() => {
    // 데이터 초기화설정
    if (isOpen && eventData) {
      setId(eventData.id);
      setTitle(eventData.title);
      setDate(eventData.date);
    } else {
      setId("");
      setTitle("");
      setDate("");
    }
  }, [isOpen, eventData]);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = "auto"; // 이전 높이 초기화
    el.style.height = el.scrollHeight + "px"; // 현재 내용 높이 반영
  }, [title]);

  useEffect(() => {
    if (isOpen && textRef.current) {
      textRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !eventData) return null;
  if (!root) return null;

  return ReactDOM.createPortal(
    // 팝업창 순서 겹침 협상 해결을 위한 루트 설정
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        id="modal-container"
        className="bg-white rounded-lg p-6 shadow-lg w-96"
      >
        <div className="flex flex-row justify-between items-baseline">
          <h2 className="text-lg font-semibold mb-4 leading-none">
            이벤트 수정
          </h2>
          <button
            className="p-0 m-0 text-xl leading-none flex items-center justify-center"
            onClick={onClose}
          >
            ❌
          </button>
        </div>

        <textarea
          ref={textRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2 mb-2 resize-none overflow-hidden"
          rows={1}
          placeholder="제목을 입력하세요"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => {
              deleteEvent(eventData.id);
              onClose();
            }}
          >
            삭제
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() =>
              onSave({ id: eventData.id, title: title, date: date })
            }
          >
            저장
          </button>
        </div>
      </div>
    </div>,
    root // 팝업창 순서 겹침 협상 해결을 위한 루트 설정
  );
};

export default EventModal;
