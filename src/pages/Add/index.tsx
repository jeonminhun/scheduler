import { useState } from "react"
import { useCalendar } from "../../context/useCalendar";

export default function Index() {
  const { addEvent } = useCalendar();
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  return (
    <div>
      <input
        type="text"
        value={input}
        className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="date"
        value={input2}
        className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setInput2(e.target.value)}
      />
      <button
        onClick={() => addEvent({ title: input, date: input2 })} // 이거 적용하는법 찾기
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
}