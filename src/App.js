import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./component/Register";
import ValidateOtp from "./component/ValidateOtp";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/validate-otp" element={<ValidateOtp />} />
      </Routes>
    </Router>
  );
}

export default App;
