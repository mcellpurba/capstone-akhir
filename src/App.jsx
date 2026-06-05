import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import JobSearch from "./pages/JobSearch"
import SavedJobs from "./pages/SavedJobs"
import DetailJob from "./pages/detailjob"
import Profile from "./pages/Profile"
import JobPrediction from "./pages/JobPrediction"
import Chatbot from "./pages/Chatbot"
import "./styles/style.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/search" element={<JobSearch />} />
      <Route path="/saved-jobs" element={<SavedJobs />} />
      <Route path="/job/:id" element={<DetailJob />} />
      <Route path="/prediction" element={<JobPrediction />} />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  );
}

export default App
