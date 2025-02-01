import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../styles/global.css'
function UserDetailsPage() {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username && gender) {
      localStorage.setItem("username", username);
      localStorage.setItem("gender", gender);
      navigate("/quiz");
    }
  };

  return (
    <div className="user-details-container">
      <h2>Enter Your Details</h2>
      <input type="text" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)} />
      <select onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UserDetailsPage;
