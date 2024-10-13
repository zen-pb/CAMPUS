import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import {
  fetchRegions,
  fetchProvincesByRegion,
  fetchCitiesMunicipalitiesByProvince,
  fetchBarangaysByCityMunicipality,
} from "../api/psgcApi";

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

  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

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

  useEffect(() => {
    fetchRegions()
      .then((data) => setRegions(data))
      .catch((error) => console.error("Error fetching regions:", error));
  }, []);

  const handleRegionChange = (event) => {
    const regionCode = event.target.value;
    handleChange(event);

    fetchProvincesByRegion(regionCode)
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  };

  // Handle province change
  const handleProvinceChange = (event) => {
    const provinceCode = event.target.value;
    handleChange(event);

    fetchCitiesMunicipalitiesByProvince(provinceCode)
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  // Handle city/municipality change
  const handleCityMunicipalityChange = (event) => {
    const cityCode = event.target.value;
    handleChange(event);

    fetchBarangaysByCityMunicipality(cityCode)
      .then((data) => setBarangays(data))
      .catch((error) => console.error("Error fetching barangays:", error));
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    setLoading(true);
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
          type="email"
          name="email"
          placeholder="Email"
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
          placeholder="Middle Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
        />

        {isStudent && (
          <>
            <input type="date" name="date_of_birth" onChange={handleChange} />

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

            <select name="region" onChange={handleRegionChange}>
              <option value="">-- Select Region --</option>
              {regions.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.name}
                </option>
              ))}
            </select>

            <select name="province" onChange={handleProvinceChange}>
              <option value="">-- Select Province --</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>

            <select
              name="city_municipality"
              onChange={handleCityMunicipalityChange}
            >
              <option value="">-- Select City/Municipality --</option>
              {cities.map((city) => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>

            <select name="barangay" onChange={handleChange}>
              <option value="">-- Select Barangay --</option>
              {barangays.map((barangay) => (
                <option key={barangay.code} value={barangay.code}>
                  {barangay.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="street"
              placeholder="Street"
              onChange={handleChange}
            />

            <p>In case of emergency:</p>
            <input
              type="text"
              name="emergency_contact.guardian"
              placeholder="Guardian"
              onChange={handleChange}
            />
            <input
              type="number"
              name="emergency_contact.contact_number"
              placeholder="Contact Number"
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

        <button disabled={loading}>
          {loading ? <span>Redirecting...</span> : <span>Signup</span>}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
