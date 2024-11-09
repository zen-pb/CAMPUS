import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import {
  Login,
  Signup,
  ForgotPassword,
  ResetPassword,
  UserManagement,
  CourseManagement,
  ScheduleManagement,
  Reports,
  Notifications,
  Settings,
  Dashboard,
} from "./pages";
import Layout from "./Layout";

function App() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (session) {
      sessionStorage.setItem("session", JSON.stringify(session));
    }
  }, [session]);

  useEffect(() => {
    const handleStorageChange = () => {
      const sessionData = sessionStorage.getItem("session");
      const parsedData = sessionData ? JSON.parse(sessionData) : null;
      setSession(parsedData);
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            session ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setSession={setSession} />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            session ? (
              <Layout session={session} setSession={setSession} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          {/* Relative Paths */}
          <Route
            path="dashboard"
            element={<Dashboard session={session} setSession={setSession} />}
          />{" "}
          {/* Use relative path */}
          <Route path="user-management" element={<UserManagement />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route path="schedule-management" element={<ScheduleManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
