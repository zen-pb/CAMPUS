import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Topbar } from "../components";

export default function Dashboard() {
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState({
  //   id_number: session.user.id_number,
  //   given_name: session.user.given_name || "",
  //   user_type: session.userType,
  // });
  // const greetingName =
  //   user.given_name || (user.id_number === "09-10009" ? "Admin" : "");

  // const randomGreeting = [
  //   `Hey there, ${greetingName}!`,
  //   `How's it going, ${greetingName}?`,
  //   `What's up, ${greetingName}?`,
  //   `Greetings, ${greetingName}!`,
  //   `Yo, ${greetingName}!`,
  //   `Howdy, ${greetingName}!`,
  //   `Hiya, ${greetingName}!`,
  //   `Good to see you, ${greetingName}!`,
  //   `Yahallo, ${greetingName}!`,
  //   `Hello bro, ${greetingName}!`,
  // ];

  // const randomGreetingIndex = Math.floor(Math.random() * randomGreeting.length);
  // const greeting = randomGreeting[randomGreetingIndex];

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
