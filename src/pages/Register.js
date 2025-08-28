import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    user_role: "",
    specialization: "",
    experience_years: "",
    available_days: "",
    date_of_birth: "",
    gender: "",
    address: "",
    emergency_contact: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", formData);
      alert("✅ Registered Successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>REGISTER</h2>

        {/* Common Fields (Users Table) */}
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />

        {/* User Role */}
        <select
          name="user_role"
          value={formData.user_role}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>
            Select Role
          </option>
          <option value="Patient">Patient</option>
          <option value="Provider">Provider</option>
        </select>

        {/* Doctor Specific Fields */}
        {formData.user_role === "Doctor" && (
          <>
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
            <input
              type="number"
              name="experience_years"
              placeholder="Experience (Years)"
              value={formData.experience_years}
              onChange={handleChange}
            />
            <input
              type="text"
              name="available_days"
              placeholder="Available Days (e.g., Mon, Wed, Fri)"
              value={formData.available_days}
              onChange={handleChange}
            />
          </>
        )}

        {/* Patient Specific Fields */}
        {formData.user_role === "Patient" && (
          <>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            <select required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="emergency_contact"
              placeholder="Emergency Contact"
              value={formData.emergency_contact}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit">Register</button>
        <p className="login-link">
          Already a user? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
