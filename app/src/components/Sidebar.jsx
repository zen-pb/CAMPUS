import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>{" "}
          
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
    </div>
  );
}
