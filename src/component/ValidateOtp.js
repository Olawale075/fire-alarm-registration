import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ValidateOtp.css";

const ValidateOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 30 minutes in seconds
  const location = useLocation();
  const navigate = useNavigate();

  const phonenumber = location.state?.phonenumber;

  useEffect(() => {
    console.log("Received phonenumber:", phonenumber); // Debugging purpose
    if (!phonenumber) {
      setMessage("Phone number is missing. Please try again.");
      navigate("/"); // Redirect back if phonenumber is missing
    }

    // Timer countdown logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer); // Stop the timer when it hits 0
          setMessage("OTP expired. Please request a new one.");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second

    // Cleanup the interval when component is unmounted or timer reaches 0
    return () => clearInterval(timer);
  }, [phonenumber, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = { otp, phonenumber };
      console.log("Sending payload:", payload); // Debugging purpose
      await axios.post("http://localhost:8080/api/v1/FireAlarm/validate-otp", payload);
     
      alert("OTP validated successfully! ");
      navigate("/Register");

    } catch (error) {
      console.error("Error response:", error.response?.data); // Debug backend error
      setMessage(error.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="validate-container">
      <h1>Validate OTP</h1>
      <p>Phone Number: {phonenumber}</p>
      <p>Time Remaining: {formatTime(timeLeft)}</p> {/* Display time countdown */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter the OTP"
            disabled={timeLeft === 0} // Disable input if OTP expired
          />
        </div>
        <button type="submit" className="btn" disabled={timeLeft === 0}>Validate</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ValidateOtp;
