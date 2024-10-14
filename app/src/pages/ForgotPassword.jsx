import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotRequest = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      // Change the endpoint to match the new Express route for forgot password
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Use URLSearchParams to encode the data
      });

      if (response.ok) {
        setMessage("Password reset email sent.");
        setEmail(""); // Clear the email input
      } else {
        const errorData = await response.text(); // Get error response as text
        setMessage(errorData || "Error sending password reset email."); // Use the specific error response if available
      }
    } catch (error) {
      setMessage("Error sending password reset email."); // Handle network or unexpected errors
      console.error("Error:", error); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleForgotRequest}>
        <input
          type="email"
          name="email"
          placeholder="Please fill in your email address"
          required
          value={email} // Bind the input value to the state
          onChange={(e) => setEmail(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? (
            <span>Processing...</span>
          ) : (
            <span>Request password reset</span>
          )}
        </button>
        {message && <p>{message}</p>}
      </form>
      <p>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
