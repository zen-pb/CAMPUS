export default function UserInfo({ handleChange }) {
  return (
    <>
    <h2>Basic Information</h2>
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
        name="surname"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
    </>
  );
}
