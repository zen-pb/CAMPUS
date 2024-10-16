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
  const [accountType, setAccountType] = useState("");
  const [formData, setFormData] = useState({
    id_number: "",
    given_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    contact_number: "",
    college: "",
    program: "",
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
        return { ...prevFormData, [name]: value };
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
    const fetchRegionsData = async () => {
      try {
        const data = await fetchRegions();
        setRegions(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegionsData();
  }, []);

  const handleRegionChange = async (event) => {
    const regionCode = event.target.value;
    const selectedRegion = regions.find((region) => region.code === regionCode);
    handleChange(event);

    setFormData((prevFormData) => ({
      ...prevFormData,
      region: selectedRegion.name, // Store the region name
    }));

    try {
      const data = await fetchProvincesByRegion(regionCode);
      setProvinces(data);
      setCities([]); // Clear cities when region changes
      setBarangays([]); // Clear barangays when region changes
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const handleProvinceChange = async (event) => {
    const provinceCode = event.target.value;
    const selectedProvince = provinces.find(
      (province) => province.code === provinceCode
    );
    handleChange(event);

    setFormData((prevFormData) => ({
      ...prevFormData,
      province: selectedProvince.name, // Store the province name
    }));

    try {
      const data = await fetchCitiesMunicipalitiesByProvince(provinceCode);
      setCities(data);
      setBarangays([]); // Clear barangays when province changes
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCityMunicipalityChange = async (event) => {
    const cityCode = event.target.value;
    const selectedCity = cities.find((city) => city.code === cityCode);
    handleChange(event);

    setFormData((prevFormData) => ({
      ...prevFormData,
      city_municipality: selectedCity.name, // Store the city name
    }));

    try {
      const data = await fetchBarangaysByCityMunicipality(cityCode);
      setBarangays(data);
    } catch (error) {
      console.error("Error fetching barangays:", error);
    }
  };

  const handleBarangayChange = (event) => {
    const barangayCode = event.target.value;
    const selectedBarangay = barangays.find(
      (barangay) => barangay.code === barangayCode
    );
    handleChange(event);

    setFormData((prevFormData) => ({
      ...prevFormData,
      barangay: selectedBarangay.name, // Store the barangay name
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from(`${accountType}s`).insert([
        {
          id_number: formData.id_number,
          given_name: formData.given_name,
          middle_name: formData.middle_name,
          surname: formData.last_name,
          date_of_birth: formData.date_of_birth,
          email: formData.email,
          contact_number: formData.contact_number,
          college: formData.college,
          program: formData.program,
          section: formData.section,
          street: formData.street,
          barangay: formData.barangay,
          city_municipality: formData.city_municipality,
          province: formData.province,
          region: formData.region,
          emergency_contact: formData.emergency_contact,
        },
      ]);

      if (error) throw error;

      alert(
        "Signup successful! Please wait while we verify your information. We will send you an update via email."
      );

      setTimeout(() => {
        navigate("/login"); // Redirect to login after 15 seconds
      }, 15000);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error signing up: " + error.message);
    } finally {
      setLoading(false);
    }
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
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="given_name"
          placeholder="Given Name"
          onChange={handleChange}
          required
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
          required
        />

        {accountType === "student" && (
          <>
            <input
              type="date"
              name="date_of_birth"
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              maxLength="11"
              name="contact_number"
              placeholder="Contact Number"
              onChange={handleChange}
              required
            />

            <select
              name="college"
              defaultValue=""
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                -- College --
              </option>
              <option value="CCSICT">CCSICT</option>
            </select>

            <select
              name="program"
              defaultValue=""
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                -- Program --
              </option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Entertainment and Multimedia Computing">
                Entertainment and Multimedia Computing
              </option>
            </select>

            <select
              name="section"
              defaultValue=""
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                -- Section --
              </option>
              <option value="Business Analytics">Business Analytics</option>
              <option value="Business Processing Outsourcing">
                Business Processing Outsourcing
              </option>
              <option value="Data Mining">Data Mining</option>
              <option value="Digital Animation">Digital Animation</option>
              <option value="Game Development">Game Development</option>
              <option value="Network Security">Network Security</option>
              <option value="Web and Mobile Application Development">
                Web and Mobile Application Development
              </option>
            </select>

            <select name="region" onChange={handleRegionChange} required>
              <option value="">-- Select Region --</option>
              {regions.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.name}
                </option>
              ))}
            </select>

            <select
              name="province"
              onChange={handleProvinceChange}
              required
              disabled={!formData.region}
            >
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
              required
              disabled={!formData.province}
            >
              <option value="">-- Select City/Municipality --</option>
              {cities.map((city) => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>

            <select
              name="barangay"
              onChange={handleBarangayChange}
              required
              disabled={!formData.city_municipality}
            >
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
              required
              disabled={!formData.barangay}
            />

            <p>In case of emergency:</p>
            <input
              type="text"
              name="emergency_contact.guardian"
              placeholder="Guardian Name"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="emergency_contact.contact_number"
              placeholder="Contact Number"
              onChange={handleChange}
              required
            />
          </>
        )}

        <select
          name="user_type"
          defaultValue=""
          onChange={(e) => setAccountType(e.target.value)}
          required
        >
          <option value="" disabled>
            -- Account Type --
          </option>
          <option value="student">Student</option>
          <option value="educator">Educator</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
