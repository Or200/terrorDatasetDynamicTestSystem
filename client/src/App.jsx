import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataPage from "./pages/DataPage";
import DynamicTestPage from "./pages/DynamicTestPage";
import Navbar from "./compponents/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<DataPage />} />
          <Route path="/test" element={<DynamicTestPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
