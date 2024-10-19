import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard({ session, setSession }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id_number: session.user.id_number,
    given_name: session.user.given_name || "",
    user_type: session.userType,
  });
  const randomGreeting = [
    `Hey there, ${
      user.given_name || (user.id_number === "09-10009" ? "Admin" : "")
    }!`,
    `How's it going, ${
      user.given_name || (user.id_number === "09-10009" ? "Admin" : "")
    }?`,
    `What's up, ${
      user.given_name || (user.id_number === "09-10009" ? "Admin" : "")
    }?`,
    `Greetings, ${
      user.given_name || (user.id_number === "09-10009" ? "Admin" : "")
    }!`,
    `Yo, ${user.given_name || (user.id_number === "09-10009" ? "Admin" : "")}!`,
    `Howdy, ${
      user.given_name || (user.id_number === "09-10009" ? "Admin" : "")
    }!`,
    `Hiya, ${
      user.given_name || (user.id_number === "09-10009" ? "Admin" : "")
    }!`,
    `Good to see you, ${
      user.given_name || (user.id_number === "09-10009" ? "Admin" : "")
    }!`,
    `Yahallo, ${
      user.given_name || (user.id_number === "09-10009" ? "Admin" : "")
    }!`,
    `Hello bro, ${
      user.given_name || (user.id_number === "09-10009" ? "Admin" : "")
    }!`,
  ];

  const randomGreetingIndex = Math.floor(Math.random() * randomGreeting.length);
  const greeting = randomGreeting[randomGreetingIndex];

  const handleLogout = () => {
    sessionStorage.removeItem("session");
    setSession(null);
    navigate("/login");
  };

  return (
    <div>
      {/* Dashboard */}
      <div>
        <ul>
          <li>
            <Link to="/">Overview</Link>
          </li>
          <li>
            <Link to="/user-management">User Management</Link>
          </li>
          <li>
            <Link to="/course-management">Course Management</Link>
          </li>
          <li>
            <Link to="/schedule-management">Schedule Management</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
          <li>
            <Link to="/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
        <button onClick={handleLogout} disabled={loading}>
          {loading ? <span>Logging Out...</span> : <span>Logout</span>}
        </button>
      </div>

      <h1>{greeting}</h1>
    </div>
  );
}
