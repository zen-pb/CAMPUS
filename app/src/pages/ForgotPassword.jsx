import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const handleForgotRequest = async (event) => {
    event.preventDefault();

    setLoading(true);
  };

  return (
    <div>
      <form onSubmit={handleForgotRequest}>
        <input
          type="email"
          name="email"
          placeholder="Please fill in your email address"
        />
        <input
          name="id_number"
          type="text"
          pattern="^\d{2}-\d{5}$"
          maxLength="8"
          placeholder="Please fill in id number"
        />
        <button disabled={loading}>
          {loading ? <span>Logging In...</span> : <span>Login</span>}
        </button>
      </form>
      <p>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
