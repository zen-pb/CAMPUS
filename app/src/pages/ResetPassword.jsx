import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [tokenValid, setTokenValid] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/reset-password?token=${token}`
        );

        if (response.ok) {
          setTokenValid(true);
        } else {
          const errorData = await response.text();
          setMessage(errorData || "Invalid or expired token");
        }
      } catch (error) {
        setMessage("Error validating token");
      }
    };

    if (token) {
      validateToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: newPassword }),
      });

      if (response.ok) {
        setMessage("Password reset successful!");
        navigate("/login"); // Redirect to login page after successful reset
      } else {
        const errorData = await response.text();
        setMessage(errorData || "Error resetting password.");
      }
    } catch (error) {
      setMessage("An error occurred while resetting the password.");
    }
  };

  if (!tokenValid) {
    return <p>{message || "Validating token..."}</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
