import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type EventAddprops = {
  isOpen: boolean;
  evdate: string;
  onClose: () => void;
  onSave: (data: { title: string; date: string }) => void;
};

const EventAdd: React.FC<EventAddprops> = ({
  isOpen,
  evdate,
  onClose,
  onSave,
}) => {
  const root = document.getElementById("root");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const titleRef = React.useRef<HTMLInputElement>(null);

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
      onSave({ title, date });
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
    if (evdate) {
      setDate(evdate);
      setTitle("");
    } else {
      setDate("");
      setTitle("");
    }
  }, [evdate]);

   useEffect(() => {
      if (isOpen && titleRef.current) {
        titleRef.current.focus();
      }
    }, [isOpen]);

  if (!isOpen) return null;
  if (!root) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        id="modal-container"
        className="bg-white rounded-lg p-6 shadow-lg w-96"
      >
        <div className="flex flex-row justify-between items-baseline">
          <h2 className="text-lg font-semibold mb-4">일정 추가</h2>
          <button
            className="p-0 m-0 text-xl leading-none flex items-center justify-center"
            onClick={onClose}
          >
            ❌
          </button>
        </div>

        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              onSave({ title, date });
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>,
    root
  );
};

export default EventAdd;
