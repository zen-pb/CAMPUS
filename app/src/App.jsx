import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Login, Signup, Dashboard } from "./pages";

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
      setSession(sessionData ? JSON.parse(sessionData) : null);
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
        <Route
          path="/dashboard"
          element={
            session ? (
              <Dashboard session={session} setSession={setSession} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
