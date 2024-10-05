import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

export default function Login({ setSession }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [id_number, setIDNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id_number", id_number)
      .single();

    if (fetchError) {
      console.log(`Error fetching user: ${fetchError.message}`);
    }

    if (user) {
      const isPasswordValid = password === user.password;

      const { data: userData, error: fetchError } = await supabase
        .from(`${user.user_type}s`)
        .select("*")
        .eq("id_number", id_number)
        .single();

      if (fetchError) {
        console.log(`Error fetching user: ${fetchError.message}`);
      }

      if (isPasswordValid) {
        setSession({
          user: userData,
          userType: user.user_type,
        });
        navigate("/dashboard");
      } else {
        alert("Wrong Password");
      }
    } else {
      alert("Not registered");
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          className="bg-red"
          type="text"
          placeholder="ID Number"
          pattern="^\d{2}-\d{5}$"
          maxLength="8"
          onChange={(e) => setIDNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading}>
          {loading ? <span>Logging In...</span> : <span>Login</span>}
        </button>
      </form>
      <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
    </div>
  );
}
