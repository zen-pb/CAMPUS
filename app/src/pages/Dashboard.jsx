import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ session, setSession }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id_number: session.user.id_number,
    given_name: session.user.given_name || "",
    user_type: session.userType,
  });
  const randomGreeting = [
    "Hey there!",
    "How's it going?",
    "What's up?",
    "Greetings!",
    "Yo!",
    "Howdy!",
    "Hiya!",
    "Good to see you!",
    "Yahallo!",
    "Hello, bro!",
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
      <h1>
        {greeting} {user.given_name || user.id_number}
      </h1>
      <div>
        <a>Profile</a>
      </div>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? <span>Logging Out...</span> : <span>Logout</span>}
      </button>
    </div>
  );
}
