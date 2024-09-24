import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }

    if (newOtp.every((value) => value !== "")) {
      handleOtpSubmit(newOtp);
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      event.target.previousSibling
    ) {
      event.target.previousSibling.focus();
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      setDialogOpen(true);
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (event, optArray) => {
    event.preventDefault();

    setLoading(true);

    const optValue = optArray.join("");
    const { session, error } = await supabase.auth.verifyOtp({
      email,
      token: optValue,
      type: "email",
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      setDialogOpen(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className={"button block"} disabled={loading}>
          {loading ? <span>Processing...</span> : <span>Login</span>}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      <dialog open={isDialogOpen}>
        <h1>Please verify your e-mail address</h1>
        We've sent an OTP code to <em className="font-bold">{email}</em> to
        verify your email address and activate your account. The OTP code will
        expire in 10 mins.
        <form>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              pattern="[0-9]"
              required
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </form>
      </dialog>
    </div>
  );
}
