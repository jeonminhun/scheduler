import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import type { Event } from "../../context/types";

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventData: Event[] | undefined;
};

const EventSearch: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  eventData,
}) => {
  const root = document.getElementById("root");

  const escKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escKeyDown);
    return () => document.removeEventListener("keydown", escKeyDown);
  }, []);
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

  if (!isOpen || !eventData) return null;
  if (!root) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        id="modal-container"
        className="bg-white rounded-lg p-6 shadow-lg w-[800px]"
      >
        <div className="flex flex-row justify-between items-baseline">
          <h2 className="text-lg font-semibold mb-4 leading-none">검색 결과</h2>
          <button
            className="p-0 m-0 text-xl leading-none flex items-center justify-center"
            onClick={onClose}
          >
            ❌
          </button>
        </div>
        <ul className="space-y-2 max-h-[900px] overflow-y-auto pr-2">
          {eventData.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2"
            >
              <span className="flex items-center justify-between bg-white-100 rounded-lg px-3 py-2">
                {task.title}
              </span>
              <span className="flex items-center justify-between bg-white-100 rounded-lg px-3 py-2">
                {task.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    root
  );
};

export default EventSearch;
