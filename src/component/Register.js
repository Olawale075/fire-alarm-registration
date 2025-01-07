import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: "", phonenumber: "" });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const ToastExample = () => {
    const showToast = () => {
        toast.success("This is a toast alert!", {
            position: toast.POSITION.TOP_CENTER,
        });
    };}

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/FireAlarm/register", formData);
      alert("{validate-otp");
      navigate("/validate-otp", { state: { phonenumber: formData.phonenumber } });
    } catch (error) {
      console.error(error);
      setError("Failed to send OTP. Please try again.");
    }
  };
  

  return (
    <div className="register-container">
      <h1>Fire Alarm Registration</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </div>
        <button type="submit" className="btn">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
