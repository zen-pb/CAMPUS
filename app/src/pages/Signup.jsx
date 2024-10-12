import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [formData, setFormData] = useState({
    id_number: "",
    given_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    contact_number: "",
    college: "",
    course: "",
    section: "",
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    region: "",
    emergency_contact: { guardian: "", contact_number: "" },
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
          maxLength="8"
          onChange={handleChange}
        />
        <input
          type="text"
          name="given_name"
          placeholder="Given Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="middle_name"
          placeholder="Last Name"
          onChange={handleChange}
        />
        {!isStudent ? (
          ""
        ) : (
          <>
            <input type="date" name="date_of_birth" onChange={handleChange} />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              type="tel"
              maxLength="11"
              name="contact_number"
              placeholder="Contact Number"
              onChange={handleChange}
            />

            <select name="college" defaultValue="" onChange={handleChange}>
              <option value="" disabled>
                -- College --
              </option>
              <option value="CCSICT">CCSICT</option>
              <option value="CED">CED</option>
            </select>

            <select name="course" defaultValue="" onChange={handleChange}>
              <option value="" disabled>
                -- Course --
              </option>
              <option value="Computer Science">Computer Science</option>
            </select>

            <select name="section" defaultValue="" onChange={handleChange}>
              <option value="" disabled>
                -- Section --
              </option>
              <option value="Business Analytics">Business Analytics</option>
            </select>

            <select id="region" defaultValue=""></select>
            <input type="hidden" name="region_text" id="region-text" />

            <select id="province" defaultValue=""></select>
            <input type="hidden" name="province_text" id="province-text" />

            <select id="city" defaultValue=""></select>
            <input type="hidden" name="city_text" id="city-text" />

            <select id="barangay" defaultValue=""></select>
            <input type="hidden" name="barangay_text" id="barangay-text" />

            <p>In case of emergency:</p>
            <input
              type="text"
              name="emergency_contact.guardian"
              onChange={handleChange}
            />
            <input
              type="number"
              name="emergency_contact.contact_number"
              onChange={handleChange}
            />
          </>
        )}

        <select
          name="user_type"
          defaultValue=""
          onChange={(e) => setIsStudent(e.target.value === "student")}
        >
          <option value="" disabled>
            -- Account Type --
          </option>
          <option value="student">Student</option>
          <option value="educator">Educator</option>
        </select>

        <button className="border w-16" disabled={loading}>
          {loading ? <span>Redirecting...</span> : <span>Signup</span>}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
