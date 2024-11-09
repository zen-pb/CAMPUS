import { Outlet } from "react-router-dom";
import { Sidebar, Topbar } from "./components";

export default function Layout({ session, setSession }) {
  const handleLogout = () => {
    sessionStorage.removeItem("session");
    setSession(null);
    navigate("/login");
  };

  return (
    <div>
      <Sidebar session={session} />
      <div>
        <Topbar session={session} />
        <Outlet />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
