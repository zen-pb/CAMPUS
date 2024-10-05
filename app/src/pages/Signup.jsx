import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_number: "",
    given_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    college: "",
    course: "",
    section: "",
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    region: "",
    emergency_contact: { guardian: "", contact_number: "" },
    contact_number: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");

    setFormData((prevFormData) => {
      if (keys.length === 1) {
        return {
          ...prevFormData,
          [name]: value,
        };
      } else {
        return {
          ...prevFormData,
          [keys[0]]: {
            ...prevFormData[keys[0]],
            [keys[1]]: value,
          },
        };
      }
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          id_number: formData.id_number,
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
      },
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      navigate("/checkemail", { state: { email: formData.email } });
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="id_number"
          placeholder="ID Number"
          pattern="^\d{2}-\d{5}$"
          onChange={handleChange}
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="middle_name"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input type="date" name="date_of_birth" onChange={handleChange} />
        <select name="college" onChange={handleChange}>
          <option value="" disabled selected>
            -- College --
          </option>
          <option value="CCSICT">CCSICT</option>
          <option value="CED">CED</option>
        </select>
        <select name="course" onChange={handleChange}>
          <option value="" disabled selected>
            -- Course --
          </option>
          <option value="Computer Science">Computer Science</option>
        </select>
        <select name="section" onChange={handleChange}>
          <option value="" disabled selected>
            -- Section --
          </option>
          <option value="Business Analytics">Business Analytics</option>
        </select>
        <select id="region"></select>
        <input type="hidden" name="region_text" id="region-text" />

        <select id="province"></select>
        <input type="hidden" name="province_text" id="province-text" />

        <select id="city"></select>
        <input type="hidden" name="city_text" id="city-text" />

        <select id="barangay"></select>
        <input type="hidden" name="barangay_text" id="barangay-text" />

        <p>In case of emergency:</p>
        <input type="text" name="emergency_contact.guardian" />
        <input type="number" name="emergency_contact.contact_number" />

        <input type="number" name="contact_number" />

        <button className="border w-16" disabled={loading}>
          {loading ? <span>Redirecting...</span> : <span>Signup</span>}
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
