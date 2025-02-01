import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetailsPage from "./pages/UserDetailsPage";
import QuizPage from "./pages/QuizPage";
import LandingPage from "./pages/LandingPage";



function App() {
  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
  );
}

export default App;