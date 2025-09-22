import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/index/index.tsx";
import Today from "./pages/Today/index.tsx";
import Add from "./pages/Add/index.tsx";
import Layout from "./layout/layout.tsx";

function App() {

  return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} /> 
            <Route path="today" element={<Today />} /> 
            <Route path="add" element={<Add />} /> 
          </Route>
        </Routes>
  );
}

export default App
