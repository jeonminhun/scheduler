import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import "./index.css";
import { CalendarProvider } from "./context/CalendarProvider.tsx";
// 프로바이더 사용을 위해 선언
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CalendarProvider> 
        <App />
      </CalendarProvider>
    </BrowserRouter>
  </StrictMode>
);
