import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Settings from "./pages/Settings";
import { ToastContainer } from "react-toastify";
import './App.css';

function Layout() {

    const savedSettings = JSON.parse(localStorage.getItem("notificationSettings")) || {};

  return (
    <>
      <Navbar />
      <Outlet /> {/* ✅ This ensures nested pages are displayed */}
<ToastContainer
        position={savedSettings.position || "top-right"}
        autoClose={savedSettings.duration || 5000}
      />    </>
  );
}

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} /> {/* ✅ Default route */}
          <Route path="applications" element={<Applications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
  );
}
